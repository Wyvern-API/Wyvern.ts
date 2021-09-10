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

    private gateway: Gateway;

    constructor(private options: ClientOptions) {
        super();
        Client._config = loadConfig(this.options.path);
        this.gateway = Gateway.getInstance(ShardId);
        this.handleGatewayDebug();
    }

    public connect(): void {
        this.gateway.connect();
    }

    private handleGatewayDebug(): void {
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
