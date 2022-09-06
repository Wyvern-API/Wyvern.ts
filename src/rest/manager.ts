import { APIEndpoints, Options, RequestMethod } from '../types/rest';
import { router } from './builder';
import { Handler } from './handler';
import { Request } from './request';

export class Manager {
    private handlers: Map<string[], Handler> = new Map<string[], Handler>();
    public globalRemaining = -1;
    public globalReset = -1;
    public globalDelay = -1;
    public globalLimited = false;

    public get api(): APIEndpoints {
        return router(this);
    }

    public request(method: RequestMethod, url: string, options: Options & { routes: string[] }): unknown {
        const request = new Request(method, url, options);
        let handler = this.handlers.get(options.routes);

        if (handler == null) {
            handler = new Handler(this);
            this.handlers.set(options.routes, handler);
        }
        return handler.push(request);
    }
}
