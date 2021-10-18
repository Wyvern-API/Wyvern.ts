import { InviteTargetType } from '.';
import { Nullable } from '../..';
import { User } from './user';

export interface Channel {
    id: string;
    type: ChannelType;
    guild_id?: string;
    position?: number;
    premission_overwrites?: Overwrite[];
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

export interface AllowedMentions {
    parse: AllowedMentionTypes[];
    roles: string[];
    users: string[];
    replid_user: boolean;
}

export enum AllowedMentionTypes {
    RoleMentions = 'roles',
    UserMentions = 'users',
    EveryoneMentions = 'everyone'
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

export interface Overwrite {
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

export interface CreateGuildChannel {
    name: string;
    type: ChannelType;
    topic: string;
    bitrate: string;
    user_limit: number;
    rate_limit_per_user: number;
    position: number;
    permission_overwrites: Overwrite;
    parent_id: string;
    nsfw: boolean;
}

export interface CreateDM {
    recipient_id: string;
}

export interface CreateGroupDM {
    access_tokens: string[];
    nicks: Record<string, string>;
}

export interface ModifyDMChannel {
    name: string;
    icon: number;
}

export interface ModifyGuildChannel {
    name: string;
    type: ChannelType;
    position: Nullable<number>;
    topic: Nullable<string>;
    nsfw: Nullable<boolean>;
    rate_limit_per_user: Nullable<number>;
    parent_id: Nullable<string>;
    rtc_region: Nullable<string>;
    video_quality_mode: Nullable<string>;
    default_auto_archive_duration: Nullable<number>;
}

export interface ModifyThreadChannel {
    name: string;
    archived: boolean;
    auto_archive_duration: number;
    locked: boolean;
    invitable: boolean;
    rate_limit_per_user: Nullable<number>;
}

export interface ModifyGuildChannelPosition {
    id: string;
    position: number | null;
    lock_permissions: boolean | null;
    parent_id: string | null;
}

export interface ModifyChannelPermissions {
    allow: string;
    deny: string;
    type: 0 | 1;
}

export interface FollowedChannel {
    channel_id: string;
    webhook_id: string;
}

export interface ListActiveThreads {
    threads: Channel[];
    members: ThreadMember[];
    has_more: boolean;
}

export interface ListArchivedThreads {
    before?: string;
    limit?: number;
}

export interface StartThreadWithMessage {
    name: string;
    auto_archive_duration: number;
}

export interface StartThreadWithoutMessage extends StartThreadWithMessage {
    type: ChannelType;
    invitable?: boolean;
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

export interface GetChannelMessages {
    around: string;
    before: string;
    after: string;
    limit: number;
}

export interface CreateChannelInvite {
    max_age: number;
    max_uses: number;
    temporary: boolean;
    unique: boolean;
    target_type: InviteTargetType;
    target_user_id: string;
    target_application_id: string;
}

export interface FollowNewsChannel {
    webhook_channel_id: string;
}

export interface AddGroupDMRecipient {
    access_token: string;
    nick: string;
}
