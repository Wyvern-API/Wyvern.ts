import { GatewayIntents } from '../gateway';

export interface ClientOptions {
    path: string;
}

export interface JSONBotConfig extends BaseConfig {
    intents: GatewayIntents[];
}

export interface BotConfig extends BaseConfig {
    intents: number;
}

export interface BaseConfig {
    token: string;
    shards?: number | 'auto';
    prefix?: string;
}
