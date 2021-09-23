import { Cache } from '../../client';

export interface ClientCache {
    guilds: Cache<number>;
    roles: Cache<number>;
    users: Cache<number>;
    channels: Cache<number>;
}
