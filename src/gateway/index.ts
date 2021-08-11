import { OpCodes } from '@WyvernTypes/gateway';
import { EventEmitter } from 'events';

class Gateway extends EventEmitter {
    private static instance: Gateway;

    public static getInstance(id: number): Gateway {
        if (!this.instance) {
            return new Gateway(id);
        }
        return this.instance;
    }

    private constructor(public readonly id: number) {
        super();
    }

    public connect(): void {}

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
