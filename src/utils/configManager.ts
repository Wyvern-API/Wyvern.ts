import { BotConfig, JSONBotConfig, ClientOptions } from '../types/config';
import { GatewayIntents } from '../types/gateway';

export function loadConfig(clientOption: ClientOptions): BotConfig {
    const { configPath: path, config: clientConfig } = clientOption;
    if (path && !path.endsWith('.json')) {
        throw new Error('Only json files are supported for now');
    }

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const jsonConfig = path ? require(path) : {};
    const config: Partial<JSONBotConfig> = { ...jsonConfig, ...clientConfig };
    if (!config.token) {
        throw new Error('No provided token');
    }

    return {
        token: config.token,
        intents: calculateIntents(config.intents || []),
        prefix: config.prefix || '!',
        shards: config.shards || undefined,
        gateway: {
            payloadCompression: config.gateway?.payloadCompression || false,
            transportCompression: config.gateway?.transportCompression || false,
            format: config.gateway?.format || 'json'
        },
        http: {
            timeout: config.http?.timeout || 15_000,
            headers: config.http?.headers || [],
            version: config.http?.version || 9
        }
    };
}

export function calculateIntents(intents: GatewayIntents[]): number {
    return intents.reduce((acc, next) => {
        if (GatewayIntents[next] == undefined) throw new Error('Invalid Intent provided');
        return (acc |= typeof next === 'string' ? GatewayIntents[next] : next);
    }, 0);
}
