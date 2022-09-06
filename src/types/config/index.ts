import { GatewayIntents } from '../gateway';

export interface ClientOptions {
    configPath?: string;
    config?: Partial<JSONBotConfig>;
    main: string;
    http?: {
        headers?: unknown;
        timeout?: number;
        version?: number;
    };
}

export interface GatewayOptions {
    payloadCompression: boolean;
    transportCompression: boolean;
    format: 'json' | 'etf';
}

export interface JSONBotConfig extends BaseConfig {
    intents?: GatewayIntents[];
    gateway?: Partial<GatewayOptions>;
    http?: {
        headers?: unknown;
        timeout?: number;
        version?: number;
    };
}

export interface BotConfig extends BaseConfig {
    intents: number;
    gateway: GatewayOptions;
    http: {
        headers: unknown;
        timeout: number;
        version: number;
    };
}

export interface BaseConfig {
    token: string;
    shards?: number | 'auto';
    prefix?: string;
}
