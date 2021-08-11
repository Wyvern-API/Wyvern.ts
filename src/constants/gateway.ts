import { CloseCodes } from "@WyvernTypes/gateway";

export const irreversibleCodes = Object.freeze([
    1000,
    CloseCodes.AuthenticationFailed,
    CloseCodes.InvalidShard,
    CloseCodes.ShardingRequired,
    CloseCodes.InvalidIntents,
    CloseCodes.DisallowedIntents
]);

export const unresumableCodes = Object.freeze([
    1000,
    CloseCodes.SessionDepreciated,
    CloseCodes.InvalidSequence
]);

