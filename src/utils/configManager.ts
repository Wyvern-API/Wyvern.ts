import { BotConfig, JSONBotConfig } from '../types/config';
import { GatewayIntents } from '../types/gateway';

export function loadConfig(path: string): BotConfig {
    if (!path.endsWith('.json')) {
        throw new Error('Only json files are supported for now');
    }

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const config: Partial<JSONBotConfig> = require(path);
    if (!config.token) {
        throw new Error('No provided token');
    }

    return {
        token: config.token,
        intents: calculateIntents(config.intents || []),
        prefix: config.prefix || '!',
        shards: config.shards || 'auto',
        gateway: {
            payloadCompression: config.gateway?.payloadCompression || false,
            transportCompression: config.gateway?.transportCompression || false,
            format: config.gateway?.format || 'json'
        }
    };
}

export function calculateIntents(intents: GatewayIntents[]): number {
    return intents.reduce((acc, next) => {
        if (GatewayIntents[next] == undefined) throw new Error('Invalid Intent provided');
        return (acc |= typeof next === 'string' ? GatewayIntents[next] : next);
    }, 0);
}
