import { GatewayURL } from '@WyvernConstants/gateway';
import { Status } from '@WyvernConstants/status';
import { OpCodes, Payload, ResponsePayload } from '@WyvernTypes/gateway';
import { EventEmitter } from 'events';
import { FlushValues, Inflate } from 'pako';
import { TextDecoder } from 'util';
import WebSocket, { Data } from 'ws';

class Gateway extends EventEmitter {
    private static instance: Gateway;

    public static getInstance(id: number): Gateway {
        if (!this.instance) {
            return new Gateway(id);
        }
        return this.instance;
    }

    private ws?: WebSocket;
    private sessionId = '';
    private sequence = -1;
    private connectedAt = 0;
    private status: Status = Status.Idle;
    private heartbeatTimer?: NodeJS.Timer;
    private compression = false;
    private encoding = 'json';

    private decoder = new TextDecoder();

    private inflate = new Inflate({
        chunkSize: 65535,
        to: 'string'
    });

    private constructor(public readonly id: number) {
        super();
    }

    public connect(): void {
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.identify();
            return;
        }

        const ws = (this.ws = new WebSocket(GatewayURL));

        //ws.on('open', () => {});
        ws.on('message', (data) => this.onMessage(data));
        //ws.on('error', () => {});
        ws.on('close', (code: number) => this.disconnect(code));
    }

    public disconnect(code: number): void {
        if (!this.ws) return;
        this.ws.close(code);
    }

    public send(data: ResponsePayload, priority = false): void {}

    private onMessage(data: Data): void {
        let raw;
        if (data instanceof ArrayBuffer) {
            data = new Uint8Array(data) as Uint8Array;
            const { length } = data as Uint8Array;
            if (this.compression) {
                const Z_LIB_SUFFIX = [0x00, 0x00, 0xff, 0xff];
                const flush =
                    length >= 4 &&
                    (data as Uint8Array).slice(-4).every((element, index) => element === Z_LIB_SUFFIX[index]);

                this.inflate.push(data, flush && FlushValues.Z_SYNC_FLUSH);
                this.inflate.result;
            }
        } else raw = data;

        if (this.encoding === 'json') {
            if (typeof raw !== 'string') {
                raw = this.decoder.decode(raw as ArrayBuffer);
            }
            raw = JSON.parse(raw);
        }

        this.handlePacket(raw as Payload);
    }

    private handlePacket(packet: Payload): void {
        if (!packet) {
            return;
        }

        switch (packet.op) {
            case OpCodes.Heartbeat:
                break;
        }
    }

    private heartbeat(): void {}

    private identify(): void {}

    private identifyNew(): void {}

    private resume(): void {}

    private processQueue(): void {}

    private sendPacket(): void {}
}

export default Gateway;
