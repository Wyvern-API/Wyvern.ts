import { APIEndpoints, Options } from '../types/rest';
import { Manager } from './manager';

const noop = () => {}; //eslint-disable-line @typescript-eslint/no-empty-function

const methods = ['get', 'patch', 'post', 'put', 'delete'];

export function router(manager: Manager): APIEndpoints {
    const route: string[] = [];
    const handlers = {
        get: (_: unknown, property: never): unknown => {
            if (methods.includes(property)) {
                const routeBucket: string[] = [];
                for (let i = 0; i < route.length; i++) {
                    if (route[i - 1] === 'reactions') break;
                    if (/\d{16,19}/g.test(route[i]) && !/channels|guilds/.test(route[i - 1])) routeBucket.push(':id');
                    else routeBucket.push(route[i]);
                }

                return (options: Options) =>
                    manager.request(property, route.join('/'), { routes: routeBucket, ...options });
            }
            route.push(property);
            return new Proxy(noop, handlers);
        },
        apply: (_target: unknown, _: unknown, args: string[]): unknown => {
            route.push(...args.filter((arg) => arg != null));
            return new Proxy(noop, handlers);
        }
    };

    return new Proxy<APIEndpoints>(noop as never, handlers);
}
