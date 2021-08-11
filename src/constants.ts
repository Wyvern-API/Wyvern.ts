import { CloseCodes } from "@WyvernTypes/gateway";

export const IrreversibleCodes = Object.freeze([
    1000,
    CloseCodes.AuthenticationFailed,
    CloseCodes.InvalidShard,
    CloseCodes.ShardingRequired,
    CloseCodes.InvalidIntents,
    CloseCodes.DissallowedIntents
]);

export const UnresumableCodes = Object.freeze([1000, CloseCodes.SessionDepreciated, CloseCodes.InvalidSequence]);

