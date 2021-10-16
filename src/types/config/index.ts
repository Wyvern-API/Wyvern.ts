import { GatewayIntents } from '../gateway';

export interface ClientOptions {
    configPath?: string;
    config?: Partial<BotConfig>;
    main: string;
}

export interface GatewayOptions {
    payloadCompression: boolean;
    transportCompression: boolean;
    format: 'json' | 'etf';
}

export interface JSONBotConfig extends BaseConfig {
    intents: GatewayIntents[];
    gateway?: Partial<GatewayOptions>;
}

export interface BotConfig extends BaseConfig {
    intents: number;
    gateway: GatewayOptions;
}

export interface BaseConfig {
    token: string;
    shards?: number | 'auto';
    prefix?: string;
}
