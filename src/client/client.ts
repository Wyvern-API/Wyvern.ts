import chalk from 'chalk';
import { TypedEmitter } from 'tiny-typed-emitter';
import { isMainThread } from 'worker_threads';

import { Cache } from '.';
import Gateway from '../gateway';
import { Manager } from '../rest';
import { ShardId, ThreadManager } from '../sharding';
import { ClientCache, BotConfig, ClientOptions } from '../types';
import { Colors, loadConfig, GatewayEvents } from '../utils';

export interface ClientEvents {
    'gateway-debug': (message: string) => void;
    open: () => void;
}

export class Client extends TypedEmitter<ClientEvents> {
    public static get config(): BotConfig {
        return this._config;
    }

    private static _config: BotConfig;

    public get cache(): ClientCache {
        return this._cache;
    }

    public get options(): ClientOptions {
        return this._options;
    }

    private gateway: Gateway;
    public rest: Manager;
    private readonly _cache: ClientCache;

    constructor(private _options: ClientOptions) {
        super();
        Client._config = loadConfig(this._options);

        ThreadManager.createThreads(this);

        this.gateway = Gateway.getInstance(ShardId);
        this.rest = new Manager();
        this.handleGatewayDebug();
        this._cache = {
            guilds: new Cache<number>('guilds'),
            channels: new Cache<number>('channels'),
            roles: new Cache<number>('roles'),
            users: new Cache<number>('users')
        };
    }

    public connect(): void {
        if ((isMainThread && (Client.config.shards || 1) === 1) || isMainThread === false) {
            this.gateway.connect();
        }
    }

    private handleGatewayDebug(): void {
        this.gateway.on('open', () => this.emit('open'));
        [...Object.keys(GatewayEvents).map((key) => GatewayEvents[key as GatewayEvents])].forEach((event) => {
            this.gateway.on(event, (logColor: Colors, message: string) => {
                this.emit(
                    'gateway-debug',
                    chalk[logColor](
                        `[${new Date().toLocaleTimeString('en-us', {
                            hour12: false
                        })}, Shard ${ShardId} - ${event}]: ${message}`
                    )
                );
            });
        });
    }
}
