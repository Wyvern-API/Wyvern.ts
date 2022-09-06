import { GatewayPresenceUpdate } from './presence';

export interface IdentifyData {
    token: string;
    properties: IdentifyProperties;
    compress?: boolean;
    shard?: [number, number];
    intents: number;
    presence?: GatewayPresenceUpdate;
}

export interface IdentifyProperties {
    os: string;
    browser: string;
    device: string;
}
