import { pack, unpack } from '@wyvern-api/erlpack';
import { EventEmitter } from 'events';
import { parentPort } from 'worker_threads';
import WebSocket, { Data } from 'ws';
import { Z_SYNC_FLUSH, Inflate } from 'zlib-sync';

import { Client } from '../client/client';
import { ShardId } from '../sharding';
import {
    CloseCodes,
    HelloData,
    IdentifyData,
    OpCodes,
    Payload,
    RateLimit,
    ResponsePayload,
    ResumeData,
    ShardingOPCode,
    ShardingMessage
} from '../types';
import {
    CloseCodeErrorsMessages,
    GatewayURL,
    IrreversibleCodes,
    GatewayEvents,
    UnresumableCodes,
    ConnectionProperties,
    Colors
} from '../utils';

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

    private config = Client.config;
    private ws?: WebSocket;
    private zlib: Inflate = new Inflate({
        chunkSize: 65535,
        to: this.config.gateway.format === 'json' ? 'string' : undefined
    });
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

        const {
            gateway: { transportCompression, format }
        } = this.config;

        const ws = (this.ws = new WebSocket(GatewayURL(transportCompression, format)));
        this._status = GatewayEvents.Connecting;

        ws.on('open', () => {
            this.emitEvent(GatewayEvents.Ready, Colors.Green, 'Websocket opened');
            this.emit('open');
            const message: ShardingMessage = {
                op: ShardingOPCode.Connected,
                shardId: ShardId > -1 ? ShardId : 0
            };
            parentPort?.postMessage(message);
        });
        ws.on('message', (data) => this.onMessage(data));
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

        const errorMessage = CloseCodeErrorsMessages[code] || '';

        this.emitEvent(
            GatewayEvents.Disconnected,
            Colors.Red,
            `Weboscket has disconnected with close code ${code}${errorMessage != null ? ':' : ''}
            ${errorMessage}`
        );

        if (UnresumableCodes.includes(code)) {
            this.sessionId = '';
        }

        if (!IrreversibleCodes.includes(code)) {
            this.emitEvent(GatewayEvents.Reconnecting, Colors.Yellow, 'Websocket is reconnecting...');
            this.connect();
        } else {
            throw new Error(errorMessage);
        }
    }

    public send(data: ResponsePayload, priority = false): void {
        this.ratelimit.queue[priority ? 'unshift' : 'push'](data);
        this.processQueue();
    }

    private onMessage(data: Data): void {
        const {
            gateway: { format, transportCompression, payloadCompression }
        } = this.config;

        if (data instanceof ArrayBuffer) {
            data = new Uint8Array(data);
        }

        if (transportCompression) {
            const raw = data as Buffer;
            const l = raw.length;
            const flush =
                l >= 4 && raw[l - 4] === 0x00 && raw[l - 3] === 0x00 && raw[l - 2] === 0xff && raw[l - 1] === 0xff;

            this.zlib.push(raw, flush && Z_SYNC_FLUSH);

            if (!flush) {
                return;
            }
            data = Buffer.from(this.zlib.result as Buffer);
        } else if (payloadCompression && format === 'json') {
            const raw = data as Buffer;
            const zlib = new Inflate({ to: 'string' });
            zlib.push(raw);
            if (zlib.result != null) {
                data = Buffer.from(zlib.result as Buffer);
            }
        }

        if (format === 'json') {
            this.handlePacket(JSON.parse(data.toString()) as Payload);
        } else {
            this.handlePacket(unpack(data as Buffer) as Payload);
        }
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
        const {
            token,
            intents,
            gateway: { payloadCompression },
            shards
        } = this.config;

        const data: IdentifyData = {
            token,
            intents,
            properties: ConnectionProperties,
            compress: payloadCompression,
            shard: [ShardId > -1 ? ShardId : 0, shards as number], //Temporary too, shard fetching hasn't been added yet
            //Temporary
            presence: {
                since: null,
                status: 'online',
                afk: false,
                activities: []
            }
        };

        this.send({ op: OpCodes.Idenitfy, d: data }, true);
    }

    private resume(): void {
        if (!this.sessionId || !this.closeSequence) return;
        const { token } = this.config;

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
        const {
            gateway: { format }
        } = this.config;
        if (this.ws?.readyState !== WebSocket.OPEN) {
            return;
        }
        this.ws?.send(format === 'json' ? JSON.stringify(packet) : pack(packet));
    }

    private emitEvent(event: GatewayEvents, logColor: Colors, message: string): void {
        this._status = event;
        this.emit(event, logColor, message);
    }
}

export default Gateway;
