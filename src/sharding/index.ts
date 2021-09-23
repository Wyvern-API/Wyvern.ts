import { isMainThread, parentPort, Worker, workerData } from 'worker_threads';

import { Client } from '../client';
import { ShardingMessage, ShardingOPCode, CacheType } from '../types';
import { parse, stringify } from '../utils/json';

export const ShardId = (workerData as number) || 0;

export class ThreadManager extends null {
    private static threads: { shardId: number; worker: Worker }[] = [];
    private static client: Client;

    public static async createThreads(client: Client): Promise<void> {
        this.client = client;
        if (isMainThread) {
            for (let i = 0; i < (Client.config.shards || 0); i++) {
                await this.createThread(i);
            }
        } else {
            parentPort?.on('message', (raw: string) => {
                const message = parse<ShardingMessage>(raw);
                if (message.data == null) return;
                switch (message.op) {
                    case ShardingOPCode.GetFromCache:
                        const data = this.client.cache[message.data.type].getSync(message.data.id);
                        const response: ShardingMessage = {
                            op: ShardingOPCode.CacheResponse,
                            shardId: message.shardId,
                            response: data
                        };
                        parentPort?.postMessage(stringify(response));
                        break;
                }
            });
        }
    }

    private static async createThread(index: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const worker = new Worker(this.client.options.main, {
                workerData: index
            });
            this.threads.push({ shardId: index, worker });

            worker.on('message', (raw: unknown) => {
                const message: ShardingMessage =
                    typeof raw === 'string' ? parse<ShardingMessage>(raw) : (raw as ShardingMessage);
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
                            .forEach((thread) => thread.worker.postMessage(stringify(message)));
                        break;
                    case ShardingOPCode.CacheResponse:
                        const response: ShardingMessage = {
                            op: ShardingOPCode.CacheResponse,
                            shardId: -1,
                            response: message.response
                        };
                        this.threads[message.shardId].worker.postMessage(stringify(response));
                        break;
                }
            });
            worker.on('error', reject);
        });
    }

    public static async requestFromCache<T>(id: bigint, type: CacheType): Promise<T | undefined> {
        if (isMainThread) throw new Error("Main thread can't use requestFromCache method");

        return new Promise((resolve) => {
            const data: ShardingMessage = {
                op: ShardingOPCode.GetFromCache,
                shardId: ShardId,
                data: {
                    id,
                    type
                }
            };

            const handleMessage = (message: ShardingMessage<T>): void => {
                if (message.op === ShardingOPCode.CacheResponse && message.response != null) {
                    resolve(message.response);
                }
            };

            parentPort?.postMessage(stringify(data));
            parentPort?.on('message', (message: string) => handleMessage(parse(message)));
        });
    }
}
