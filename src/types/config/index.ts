import { GatewayIntents } from '../gateway';

export interface ClientOptions {
    path: string;
}

export interface JSONBotConfig extends BaseConfig {
    intents: GatewayIntents[];
    gateway?: {
        compression?: boolean;
        format?: 'json' | 'etf';
    };
}

export interface BotConfig extends BaseConfig {
    intents: number;
    gateway: {
        compression: boolean;
        format: 'json' | 'etf';
    };
}

export interface BaseConfig {
    token: string;
    shards?: number | 'auto';
    prefix?: string;
}
