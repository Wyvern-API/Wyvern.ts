import { join } from 'path';
import { cwd } from 'process';

import { BotConfig, JSONBotConfig } from '../types/config';
import { GatewayIntents } from '../types/gateway';

export async function loadConfig(path: string): Promise<BotConfig> {
    if (!path.endsWith('.json')) {
        throw new Error('Only json files are supported for now');
    }

    const config: Partial<JSONBotConfig> = await import(join(cwd(), path));
    if (!config.token) {
        throw new Error('No provided token');
    }

    return {
        token: config.token,
        intents: calculateIntents(config.intents || []),
        prefix: config.prefix || '!',
        shards: config.shards || 'auto'
    };
}

export function calculateIntents(intents: GatewayIntents[]): number {
    return intents.reduce((acc, next) => (acc |= typeof next === 'string' ? GatewayIntents[next] : next), 0);
}
