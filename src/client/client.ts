import { EventEmitter } from 'events';

import { GatewayEvents } from '../constants';
import Gateway from '../gateway';
import { ShardId } from '../sharding';
import { BotConfig, ClientOptions } from '../types/config';
import { loadConfig } from '../utils/configManager';

export class Client extends EventEmitter {
    private static _config: BotConfig;

    public static get config(): BotConfig {
        return this._config;
    }

    private gateway = Gateway.getInstance(ShardId);

    constructor(private options: ClientOptions) {
        super();
    }

    private async loadConfig(): Promise<void> {
        Client._config = await loadConfig(this.options.path);
    }

    public async connect(): Promise<void> {
        await this.loadConfig();
        this.gateway.connect();
        this.handleGateway();
    }

    private handleGateway(): void {
        [...Object.keys(GatewayEvents).map((k: string) => GatewayEvents[k as GatewayEvents])].forEach(
            (event: string) => {
                this.gateway.on(event, (message: string) => {
                    this.emit('gateway-debug', `[Shard ${ShardId} => ${event}]: ${message}`);
                });
            }
        );
    }
}
