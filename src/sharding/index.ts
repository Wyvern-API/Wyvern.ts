import { isMainThread, parentPort, Worker, workerData } from 'worker_threads';

import { Client } from '../client';
import { ShardingMessage, ShardingOPCode, CacheType } from '../types';

export const ShardId = !isMainThread ? (workerData.ShardId as number) : 0;
export const NumShards = (!isMainThread && (workerData.totalShards as number)) || 0;

export class ThreadManager extends null {
    private static threads: { shardId: number; worker: Worker }[] = [];
    private static client: Client;

    public static async createThreads(client: Client): Promise<void> {
        this.client = client;

        //TODO: Implement automatic sharding
        if (typeof Client.config.shards === 'string') return;
        //This part is very clumsy, I'll rewrite these 3 lines very soon
        const numShards: number = Client.config.shards || 1;
        if (numShards <= 1) return;

        if (isMainThread) {
            for (let i = 0; i < numShards; i++) {
                await this.createThread(i);
            }
        } else {
            parentPort?.on('message', (raw: string) => {
                const message: ShardingMessage = JSON.parse(raw);
                if (message.data == null) return;
                switch (message.op) {
                    case ShardingOPCode.GetFromCache:
                        const data = this.client.cache[message.data.type].getSync(message.data.id);
                        const response: ShardingMessage = {
                            op: ShardingOPCode.CacheResponse,
                            shardId: message.shardId,
                            response: data,
                            data: message.data
                        };
                        parentPort?.postMessage(JSON.stringify(response));
                        break;
                }
            });
        }
    }

    private static async createThread(index: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const worker = new Worker(this.client.options.main, {
                workerData: { ShardId: index, totalShards: Client.config.shards }
            });
            this.threads.push({ shardId: index, worker });

            worker.on('message', (raw: unknown) => {
                const message: ShardingMessage = typeof raw === 'string' ? JSON.parse(raw) : (raw as ShardingMessage);
                switch (message.op) {
                    case ShardingOPCode.Connected:
                        setTimeout(resolve, 5000);
                        break;
                    case ShardingOPCode.Disconnnected:
                        reject();
                        break;
                    case ShardingOPCode.GetFromCache:
                        this.threads
                            .filter((thread) => thread.shardId !== message.shardId)
                            .forEach((thread) => thread.worker.postMessage(JSON.stringify(message)));
                        break;
                    case ShardingOPCode.CacheResponse:
                        const response: ShardingMessage = {
                            op: ShardingOPCode.CacheResponse,
                            shardId: -1,
                            response: message.response,
                            data: message.data
                        };
                        this.threads[message.shardId].worker.postMessage(JSON.stringify(response));
                        break;
                }
            });
            worker.on('error', reject);
        });
    }

    public static async requestFromCache<T>(id: string, type: CacheType): Promise<T | undefined> {
        if (isMainThread) throw new Error("Main thread can't use requestFromCache method");

        return new Promise((resolve) => {
            const responses = [];
            const data: ShardingMessage = {
                op: ShardingOPCode.GetFromCache,
                shardId: ShardId,
                data: {
                    id,
                    type
                }
            };

            const handleMessage = (message: ShardingMessage<T>): void => {
                if (message.data?.id === id) {
                    responses.push(message);

                    if (message.op === ShardingOPCode.CacheResponse && message.response != null) {
                        resolve(message.response);
                    }

                    if (responses.length === NumShards - 1) {
                        resolve(undefined);
                    }
                }
            };

            parentPort?.postMessage(JSON.stringify(data));
            parentPort?.on('message', (message: string) => handleMessage(JSON.parse(message)));
        });
    }
}
