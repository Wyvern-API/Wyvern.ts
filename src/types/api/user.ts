import { Integration } from './guild';

export interface User {
    id: string;
    username: string;
    discriminator: string;
    avatar?: string;
    bot?: boolean;
    system?: boolean;
    mfa_enabled?: boolean;
    banner?: string;
    accent_color?: string;
    locale?: string;
    verified?: boolean;
    email?: string;
    flags?: UserFlags;
    premium_type?: PremiumTypes;
    public_flags: UserFlags;
}

export enum UserFlags {
    None = 0,
    DiscordEmployee = 1 << 0,
    PartneredServerOwner = 1 << 1,
    HypeSquadEvents = 1 << 2,
    BugHunterLevel1 = 1 << 3,
    HouseBravery = 1 << 6,
    HouseBrilliance = 1 << 7,
    HouseBalance = 1 << 8,
    EarlySupporter = 1 << 9,
    TeamUser = 1 << 10,
    BugHunterLevel2 = 1 << 14,
    VerifiedBot = 1 << 16,
    EarlyVerifiedBotDeveloper = 1 << 17,
    DiscordCertifiedModerator = 1 << 18
}

export enum PremiumTypes {
    None = 0,
    NitroClassic,
    Nitro
}

export interface ModifyCurrentUser {
    username?: string;
    avatar?: string | null;
}

export type GetCurrentUserGuilds = Partial<{
    before: string;
    after: string;
    limit: number;
}>;

export interface Connection {
    id: string;
    name: string;
    type: 'twicth' | 'youtube';
    revoked?: boolean;
    integrations?: Integration[];
    verified: boolean;
    friend_sync: boolean;
    show_activity: boolean;
    visibility: VisibilityType;
}

export enum VisibilityType {
    None = 0,
    Everyone
}
