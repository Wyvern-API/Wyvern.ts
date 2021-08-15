export interface IdentifyData {
    token: string;
    properties: {
        $os: string;
        $browser: string;
        $device: string;
    };
    compress?: boolean;
    shard?: [number, number];
    intents: number;
    presence?: any;
}
