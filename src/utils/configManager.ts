import { BotConfig, JSONBotConfig } from '../types/config';
import { GatewayIntents } from '../types/gateway';

export async function loadConfig(path: string): Promise<BotConfig> {
    if (!path.endsWith('.json')) {
        throw new Error('Only json files are supported for now');
    }

    const config: Partial<JSONBotConfig> = await import(path);
    if (!config.token) {
        throw new Error('No provided token');
    }

    return {
        token: config.token,
        intents: calculateIntents(config.intents || []),
        prefix: config.prefix || '!',
        shards: config.shards || 'auto',
        gateway: {
            compression: config.gateway?.compression || false,
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
