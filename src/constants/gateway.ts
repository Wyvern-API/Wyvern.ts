import { CloseCodes, IdentifyProperties } from '../types/gateway';

export const GatewayURL = (compression: boolean, format: 'json' | 'etf'): string =>
    `wss://gateway.discord.gg/?v=9&encoding=${format}${compression ? '&compress=zlib-stream' : ''}`;

export const IrreversibleCodes = Object.freeze([
    1000,
    CloseCodes.AuthenticationFailed,
    CloseCodes.InvalidShard,
    CloseCodes.ShardingRequired,
    CloseCodes.InvalidIntents,
    CloseCodes.DisallowedIntents
]);

export const UnresumableCodes = Object.freeze([1000, CloseCodes.SessionDepreciated, CloseCodes.InvalidSequence]);

export const CloseCodeErrorsMessages = {
    [CloseCodes.UnknownError]:
        "An unknown error has occured, we don't know exactly what hapenned, attempt to reconnect...",
    [CloseCodes.UnknownOpCode]: 'An invalid OpCode has been sent',
    [CloseCodes.DecodeError]: 'An invalid Payload has been sent',
    [CloseCodes.NotAuthenticated]: 'The client has sent a Payload before identifying',
    [CloseCodes.AuthenticationFailed]: 'You provided an invalid token, make sure you put the correct one',
    [CloseCodes.AlreadyAuthenticated]: 'The client attempted to identify again but he was already authenticated',
    [CloseCodes.SessionDepreciated]: 'The session id is no longer valid, attempt to restart a new connection...',
    [CloseCodes.InvalidSequence]:
        'An invalid sequence code has been sent when trying to resume, attempt to restart a new connection...',
    [CloseCodes.Ratelimited]: 'The client sent requests too quickly, attempting to resume...',
    [CloseCodes.SessionTimedOut]: 'The sessions timed out, attempting to resume...',
    [CloseCodes.InvalidShard]: 'An invalid shard has been sent when identifying',
    [CloseCodes.ShardingRequired]:
        "Your bot is on too many servers, Discord won't allow you to connect again unless you enable sharding",
    [CloseCodes.InvalidAPIVersion]: 'An invalid version of the API has been used',
    [CloseCodes.InvalidIntents]: 'You sent an invalid intents',
    [CloseCodes.DisallowedIntents]:
        "You're requesting some privileged intents like Presence Intent and Server Member Intent, try enabling them in the devloper portal https://discord.com/developers/applications/"
};

export enum GatewayEvents {
    Ready = 'Ready',
    Connecting = 'Connecting',
    Reconnecting = 'Reconnecting',
    Disconnected = 'Disconnected',
    Resuming = 'Resuming',
    Idle = 'Idle',
    AwaitingGuilds = 'AwaitingGuilds',
    Info = 'Info',
    Message = 'Message'
}

export const ConnectionProperties: IdentifyProperties = {
    $os: process.platform,
    $browser: 'Wyvern.ts',
    $device: 'Wyvern.ts'
};
