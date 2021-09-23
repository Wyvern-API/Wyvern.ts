import { CacheType, ThreadManager } from '..';
import { Client } from './';

export class Cache<T> {
    private cache: Map<bigint, T>;
    private shards = Client.config.shards;

    constructor(private cacheType: CacheType) {
        this.cache = new Map<bigint, T>();
    }

    public async get(id: bigint): Promise<T | undefined> {
        const result = this.cache.get(id);

        if (this.shards != null && result == null) {
            return await ThreadManager.requestFromCache<T>(id, this.cacheType);
        }

        return result;
    }

    public getSync(id: bigint): T | undefined {
        const result = this.cache.get(id);
        return result;
    }

    public set(id: bigint, value: T): void {
        this.cache.set(id, value);
    }
}
