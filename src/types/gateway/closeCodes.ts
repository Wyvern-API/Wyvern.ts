export enum CloseCodes {
    UnknownError = 4000,
    UnknownOpCode,
    DecodeError,
    NotAuthenticated,
    AuthenticationFailed,
    AlreadyAuthenticated,
    SessionDepreciated,
    InvalidSequence,
    Ratelimited,
    SessionTimedOut,
    InvalidShard,
    ShardingRequired,
    InvalidAPIVersion,
    InvalidIntents,
    DisallowedIntents
}

