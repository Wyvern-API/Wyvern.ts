import { ClientCache } from '../';

export interface ShardingMessage<T = unknown> {
    op: ShardingOPCode;
    shardId: number;
    data?: {
        type: CacheType;
        id: string;
    };
    response?: T;
}

export enum ShardingOPCode {
    GetFromCache = 0,
    CacheResponse,
    Connected,
    Disconnnected,
    Broadcast
}

export type CacheType = keyof ClientCache;
