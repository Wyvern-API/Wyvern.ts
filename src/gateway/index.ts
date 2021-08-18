import { EventEmitter } from 'events';
import WebSocket from 'ws';

import { Client } from '../client/client';
import {
    CloseCodeErrorsMessages,
    GatewayURL,
    IrreversibleCodes,
    GatewayEvents,
    UnresumableCodes,
    ConnectionProperties
} from '../constants';
import {
    CloseCodes,
    HelloData,
    IdentifyData,
    OpCodes,
    Payload,
    RateLimit,
    ResponsePayload,
    ResumeData
} from '../types/gateway';
import { Colors } from '../utils';

class Gateway extends EventEmitter {
    private static instance: Gateway;

    public static getInstance(id: number): Gateway {
        if (this.instance == null) {
            this.instance = new Gateway(id);
        }
        return this.instance;
    }

    public get status(): GatewayEvents {
        return this._status;
    }

    public get connectedAt(): number {
        return this._connectedAt;
    }

    private ws?: WebSocket;
    private sessionId = '';
    private sequence = -1;
    private closeSequence = -1;
    private _connectedAt = 0;
    private _status: GatewayEvents = GatewayEvents.Idle;
    private heartbeatInterval?: NodeJS.Timer;
    private lastHeartbeatAck = true;

    private ratelimit: RateLimit = {
        queue: [],
        remaining: 120,
        max: 120,
        resetTime: 60e3,
        timer: null
    };

    private constructor(public readonly id: number) {
        super();
    }

    public connect(): void {
        if (this.ws) {
            this.emitEvent(GatewayEvents.Info, Colors.White, 'A connection was already found when calling connect()');
            return;
        }

        const ws = (this.ws = new WebSocket(GatewayURL));
        this._status = GatewayEvents.Connecting;

        ws.on('open', () => {
            this.emitEvent(GatewayEvents.Ready, Colors.Green, 'Websocket opened');
        });
        ws.on('message', (data: string) => this.onMessage(data));
        ws.on('error', (err) => console.log(err));
        ws.on('close', (code) => this.disconnect(code));
    }

    public disconnect(code: CloseCodes = 4000): void {
        if (!this.ws) return;
        if (this.ws.readyState === WebSocket.OPEN) this.ws.close(code);
        this.ws = undefined;

        if (this.ratelimit.timer) clearTimeout(this.ratelimit.timer);
        this.ratelimit.queue = [];
        this.ratelimit.remaining = 120;

        this._status = GatewayEvents.Disconnected;
        this._connectedAt = -1;
        this.closeSequence = this.sequence;
        this.sequence = -1;

        if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);

        const erroMessage = CloseCodeErrorsMessages[code] || '';

        this.emitEvent(
            GatewayEvents.Disconnected,
            Colors.Red,
            `Weboscket has disconnected with close code ${code}${erroMessage != null ? ':' : ''}
            ${erroMessage}`
        );

        if (UnresumableCodes.includes(code)) {
            this.sessionId = '';
        }

        if (!IrreversibleCodes.includes(code)) {
            this.emitEvent(GatewayEvents.Reconnecting, Colors.Yellow, 'Websocket is reconnecting...');
            this.connect();
        }
    }

    public send(data: ResponsePayload, priority = false): void {
        this.ratelimit.queue[priority ? 'unshift' : 'push'](data);
        this.processQueue();
    }

    private onMessage(data: string): void {
        this.handlePacket(JSON.parse(data) as Payload);
    }

    private handlePacket(packet: Payload): void {
        if (!packet) {
            return;
        }

        this.emitEvent(GatewayEvents.Message, Colors.White, `Received OpCode ${packet.op}`); //Temporary

        if (packet.s) {
            this.sequence = packet.s;
        }

        switch (packet.t) {
            case 'READY':
                this._connectedAt = Date.now();
                break;
        }

        switch (packet.op) {
            case OpCodes.Hello:
                const { heartbeat_interval } = packet.d as HelloData;
                this.identify();
                this.heartbeat(heartbeat_interval);
                break;
            case OpCodes.Heartbeat:
                this.sendHeartbeat(true);
                break;
            case OpCodes.InvalidSession:
                const data = packet.d as boolean;
                setTimeout(() => {
                    if (!data) {
                        this.identifyNew();
                    } else {
                        this.resume();
                    }
                }, (Math.random() * 4 + 1) * 1000);
                break;
            case OpCodes.HeartbeatAck:
                this.lastHeartbeatAck = true;
                break;
            case OpCodes.Reconnect:
                this.disconnect();
                break;
            default:
                this.handleEvents(packet);
        }
    }

    // eslint-disable-next-line
    private handleEvents(packet: Payload): void {}

    private sendHeartbeat(ignoreLastHeartAck = false): void {
        if (!this.lastHeartbeatAck && !ignoreLastHeartAck) {
            return;
        }
        this.lastHeartbeatAck = false;

        const data: ResponsePayload = {
            op: OpCodes.Heartbeat,
            ...(this.sequence !== -1 ? { d: this.sequence } : {})
        };

        this.send(data, true);
    }

    private heartbeat(time: number): void {
        if (time === -1) {
            if (this.heartbeatInterval) {
                clearInterval(this.heartbeatInterval);
            }
        }
        if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);
        this.heartbeatInterval = setInterval(() => this.sendHeartbeat(), time);
    }

    private identify(): void {
        if (!this.sessionId) {
            this.identifyNew();
        } else {
            this.resume();
        }
    }

    private identifyNew(): void {
        const { token, intents } = Client.config;

        const data: IdentifyData = {
            token,
            intents,
            properties: ConnectionProperties,
            //Temporary
            presence: {
                status: 'online',
                afk: false,
                activities: []
            }
        };

        this.send({ op: OpCodes.Idenitfy, d: data }, true);
    }

    private resume(): void {
        if (!this.sessionId || !this.closeSequence) return;
        const { token } = Client.config;

        const data: ResumeData = {
            token,
            session_id: this.sessionId,
            seq: this.closeSequence
        };

        this.send({ op: OpCodes.Resume, d: data }, true);
    }

    private processQueue(): void {
        const { queue, max, resetTime } = this.ratelimit;
        let { remaining } = this.ratelimit;

        if (remaining === 0 || queue.length === 0) return;
        if (remaining === max) {
            this.ratelimit.timer = setTimeout(() => {
                this.ratelimit.remaining = max;
                this.processQueue();
            }, resetTime).unref();
        }

        while (remaining > 0) {
            const item = queue.shift();
            if (!item) return;

            this.sendPacket(item);
            remaining--;
        }
    }

    private sendPacket(packet: ResponsePayload): void {
        if (this.ws?.readyState !== WebSocket.OPEN) {
            return;
        }
        this.ws?.send(JSON.stringify(packet));
    }

    private emitEvent(event: GatewayEvents, logColor: Colors, message: string): void {
        this._status = event;
        this.emit(event, logColor, message);
    }
}

export default Gateway;
