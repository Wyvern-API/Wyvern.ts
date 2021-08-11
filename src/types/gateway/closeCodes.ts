export enum CloseCodes {
    UnknownError = 4000,
    UnknownOpCode,
    DecodeError,
    NotAuthenticated,
    AuthenticationFailed,
    SessionDepreciated,
    InvalidSequence,
    Ratelimited,
    SessionTimedOut,
    InvalidShard,
    ShardingRequired,
    InvalidAPIVersion,
    InvalidIntents,
    DissallowedIntents
}

export const IrreversibleCodes = Object.freeze([
    1000,
    CloseCodes.AuthenticationFailed,
    CloseCodes.InvalidShard,
    CloseCodes.ShardingRequired,
    CloseCodes.InvalidIntents,
    CloseCodes.DissallowedIntents
]);

export const UnresumableCodes = Object.freeze([1000, CloseCodes.SessionDepreciated, CloseCodes.InvalidSequence]);
