import { Agent } from 'https';
import fetch, { Response } from 'node-fetch';
import { URLSearchParams } from 'url';

import { Client } from '../client';
import { Options, RequestMethod } from '../types/rest';
import { UserAgent, API } from '../utils';

let agent: Agent | null = null;

export class Request {
    private fullUserAgent: string;

    public constructor(private method: RequestMethod, private url: string, private options: Options) {
        const { userAgentSuffix } = options;
        this.fullUserAgent = `${UserAgent}${userAgentSuffix?.length ? `, ${userAgentSuffix.join(', ')}` : ''}`;

        if (options.query) {
            const query = Object.entries(options.query as never)
                .filter(([, value]) => value != null)
                .flatMap(([key, value]) => (Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]]));
            const queryString = new URLSearchParams(query as never).toString();
            this.url = `${url}${queryString ?? `?${queryString}`}`;
        }
    }

    public make(): Promise<Response> {
        agent ??= new Agent({ keepAlive: true });

        const url = `${API}/v${Client.config.http.version}/${this.url}`;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const headers: any = {
            'User-Agent': this.fullUserAgent,
            ...(Client.config.http.headers as any) // eslint-disable-line @typescript-eslint/no-explicit-any
        };

        if (this.options.auth !== false) headers.Authorization = `Bot ${Client.config.token}`;
        if (this.options.reason) headers['X-Audit-Log-Reason'] = encodeURIComponent(this.options.reason);
        if (this.options.headers)
            Object.entries(this.options.headers).forEach(([key, value]) => (headers[key] = value));

        let body: any; // eslint-disable-line @typescript-eslint/no-explicit-any
        if (this.options.files != null) {
            //TODO: File uploads
        } else if (this.options.data != null) {
            body = JSON.stringify(this.options.data);
            headers['Content-type'] = 'application/json';
        }

        return fetch(url, {
            method: this.method,
            agent,
            body,
            headers
        });
    }
}
