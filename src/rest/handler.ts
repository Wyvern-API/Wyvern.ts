import { AsyncQueue } from '@sapphire/async-queue';
import { Response } from 'node-fetch';

import { Manager } from './manager';
import { Request } from './request';

export class Handler {
    private queue: AsyncQueue = new AsyncQueue();
    private reset = -1;
    private remaining = -1;
    private duration = -1;

    constructor(private manager: Manager) {}

    public get localLimited(): boolean {
        return this.remaining <= 0 && Date.now() < this.reset;
    }

    public get globalLimited(): boolean {
        return this.manager.globalRemaining <= 0 && Date.now() < this.manager.globalReset;
    }

    public get limited(): boolean {
        return this.globalLimited || this.localLimited;
    }

    public get inactive(): boolean {
        return this.queue.remaining === 0 && !this.limited;
    }

    private globalDelay(ms: number) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms).unref();
        });
    }

    private onRateLimit() {
        //TODO: Implement the rate limit manager
    }

    private async parseResponse(res: Response) {
        if (res.headers.get('content-type')?.startsWith('application/json')) return await res.json();
        return await res.buffer();
    }

    public async push(request: Request): Promise<unknown> {
        await this.queue.wait();

        try {
            return await this.execute(request);
        } finally {
            await this.queue.shift();
        }
    }

    private async execute(request: Request): Promise<unknown> {
        while (this.limited) {
            const isGlobal = this.manager.globalLimited;
            let delayPromise, timeout, limit;

            if (isGlobal) {
                limit = this.manager.globalLimited;
                timeout = this.manager.globalReset + 500 - Date.now();
            } else {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                limit = this.limited;
                timeout = this.reset + 500 - Date.now();
            }

            if (isGlobal) {
                this.globalDelay(timeout);
                delayPromise = this.manager.globalDelay;
                // eslint-disable-next-line @typescript-eslint/no-empty-function
            } else delayPromise = setTimeout(() => {}, timeout);

            await delayPromise;
        }

        let res: Response;
        try {
            res = await request.make();
        } catch (error) {
            throw error;
        }

        const { status, headers, ok } = res;

        if (status === 401 || status === 403 || status === 429) {
            // Handle Invalid requests
        }

        if (headers) {
            // Handler headers
        }

        if (ok) {
            // Handle 2xx and 3xx responses
            return await this.parseResponse(res);
        }

        if (status < 500 && status >= 400) {
            // Handle 4xx responses
        }
        if (status < 600 && status >= 500) {
            // Handle 5xx responses
        }

        return null;
    }
}
