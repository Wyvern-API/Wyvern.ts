import { EventEmitter } from 'events';

import Gateway from '../gateway';
import { ShardId } from '../sharding';
import { BotConfig, ClientOptions } from '../types/config';
import { loadConfig } from '../utils/configManager';

export class Client extends EventEmitter {
    private static _config: BotConfig;

    public static get config(): BotConfig {
        return this._config;
    }

    constructor(private options: ClientOptions) {
        super();
    }

    private async loadConfig(): Promise<void> {
        Client._config = await loadConfig(this.options.path);
    }

    public async connect(): Promise<void> {
        await this.loadConfig();
        Gateway.getInstance(ShardId).connect();
    }
}
