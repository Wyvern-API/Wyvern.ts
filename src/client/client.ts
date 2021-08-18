import chalk from 'chalk';
import { EventEmitter } from 'events';

import { GatewayEvents } from '../constants';
import Gateway from '../gateway';
import { ShardId } from '../sharding';
import { BotConfig, ClientOptions } from '../types/config';
import { Colors } from '../utils';
import { loadConfig } from '../utils/configManager';

export class Client extends EventEmitter {
    private static _config: BotConfig;

    public static get config(): BotConfig {
        return this._config;
    }

    private gateway = Gateway.getInstance(ShardId);

    constructor(private options: ClientOptions) {
        super();
        this.handleGateway();
    }

    private async loadConfig(): Promise<void> {
        Client._config = await loadConfig(this.options.path);
    }

    public async connect(): Promise<void> {
        await this.loadConfig();
        this.gateway.connect();
    }

    private handleGateway(): void {
        [...Object.keys(GatewayEvents).map((key) => GatewayEvents[key as GatewayEvents])].forEach((event) => {
            this.gateway.on(event, (logColor: Colors, message: string) => {
                this.emit(
                    'gateway-debug',
                    chalk[logColor](
                        `[${new Date().toLocaleTimeString('en-us', {
                            hour12: false
                        })}, Shard ${ShardId} - ${event}]: ${message}`
                    )
                );
            });
        });
    }
}
