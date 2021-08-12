import { GatewayURL } from '@WyvernConstants/gateway';
import { EventEmitter } from 'events';
import WebSocket from 'ws';

class Gateway extends EventEmitter {
    private static instance: Gateway;

    public static getInstance(id: number): Gateway {
        if (!this.instance) {
            return new Gateway(id);
        }
        return this.instance;
    }

    private ws?: WebSocket;

    private constructor(public readonly id: number) {
        super();
    }

    public connect(): void {
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.identify();
            return;
        }

        const ws = (this.ws = new WebSocket(GatewayURL));

        ws.on('open', () => {});
        ws.on('message', (data) => {
            console.log(data);
        });
        ws.on('error', () => {});
        ws.on('close', () => {});
    }

    public disconnect(): void {}

    public send(): void {}

    private onMessage(): void {}

    private handlePacket(): void {}

    private heartbeat(): void {}

    private identify(): void {}

    private identifyNew(): void {}

    private resume(): void {}

    private processQueue(): void {}

    private sendPacket(): void {}
}

export default Gateway;
