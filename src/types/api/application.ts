import { User } from './user';

export interface Application {
    id: string;
    name: string;
    icon: string | null;
    description: string;
    rpc_origins: string[];
    rpc_public: boolean;
    bot_public: boolean;
    bot_require_code_grant: boolean;
    term_of_service_url?: string;
    privacy_policy_url?: string;
    owner?: Partial<User>;
    summary: string;
    verify_key: string;
    team: Team | null;
    guild_id?: string;
    primary_sku_id?: string;
    slug?: string;
    cover_image?: string;
    flags?: ApplicationFlags;
}

export interface Team {
    icon: string | null;
    id: string;
    members: TeamMember[];
    name: string;
    owner_user_id: string;
}

export interface TeamMember {
    membership_state: MemberShipState;
    permissions: string[];
    team_id: string;
    user: Partial<User>;
}

export enum MemberShipState {
    Invited = 1,
    Accepted
}

export enum ApplicationFlags {
    GatewayPresence = 1 << 12,
    GatewayPresenceLimited = 1 << 13,
    GatewayGuildMembers = 1 << 14,
    GatewayGuildMembersLimited = 1 << 15,
    VerificationPendingLimit = 1 << 16,
    Embedded = 1 << 17
}
