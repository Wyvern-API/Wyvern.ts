import { workerData } from 'worker_threads';

export const ShardId = (workerData as number) || 0;
