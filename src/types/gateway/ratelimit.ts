import { ResponsePayload } from './payload';

export interface RateLimit {
    queue: ResponsePayload[];
    remaining: number;
    max: number;
    resetTime: number;
    timer: NodeJS.Timer | null;
}
