import { CacheType, ThreadManager } from '..';
import { Client } from './';

export class Cache<T> {
    private cache: Map<string, T>;
    private shards = Client.config.shards;

    constructor(private cacheType: CacheType) {
        this.cache = new Map<string, T>();
    }

    public async get(id: string): Promise<T | undefined> {
        const result = this.cache.get(id);

        if (this.shards != null && result == null) {
            return await ThreadManager.requestFromCache<T>(id, this.cacheType);
        }

        return result;
    }

    public getSync(id: string): T | undefined {
        const result = this.cache.get(id);
        return result;
    }

    public set(id: string, value: T): void {
        this.cache.set(id, value);
    }
}
