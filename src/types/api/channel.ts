import { User } from './user';

export interface Channel {
    id: string;
    type: ChannelType;
    guild_id?: string;
    position?: number;
    premission_overwrites?: OverwriteObject[];
    name?: string;
    topic?: string | null;
    nsfw?: boolean;
    last_message_id?: string | null;
    user_limit?: number;
    rate_limit_per_user?: number;
    recipients?: User[];
    icon?: string | null;
    owner_id?: string;
    application_id?: string;
    parent_id?: string | null;
    last_pin_timestamp?: string | null;
    rtc_region?: string | null;
    video_quality_mode?: VideoQualityMode;
    message_count?: number;
    member_count?: number;
    thread_metadata?: ThreadMetadata;
    member?: ThreadMember;
    default_auto_archive_duration?: number;
    permissions?: string;
}

export interface ChannelMention {
    id: string;
    guild_id: string;
    type: ChannelType;
    name: string;
}

export enum ChannelType {
    GuildText = 0,
    Dm,
    GuildVoice,
    GroupDm,
    GuildCategory,
    GuildNews,
    GuildStore,
    GuildNewsThread = 10,
    GuildPublicThread,
    GuildPrivateThread,
    GuildStageVoice
}

export interface OverwriteObject {
    id: string;
    type: OverwriteType;
    allow: string;
    deny: string;
}

export enum VideoQualityMode {
    Auto = 1,
    Full
}

export enum OverwriteType {
    Role = 1,
    Member
}

export interface ThreadMetadata {
    archived: boolean;
    auto_archive_duration: 60 | 1440 | 4320 | 10080;
    archive_timestamp: string;
    locked: boolean;
    invitable?: boolean;
}

export interface ThreadMember<T = unknown> {
    id?: T extends 'GUILD_CREATE' ? string : never;
    user_id?: T extends 'GUILD_CREATE' ? string : never;
    join_timestamp: string;
    flags: number;
}
