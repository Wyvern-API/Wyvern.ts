import { Nullable } from '../../utils';
import { PresenceUpdateEvent } from '../gateway/presence';
import { Channel } from './channel';
import { Emoji } from './emoji';
import { StageInstance } from './stageInstance';
import { Sticker } from './sticker';
import { User } from './user';
import { VoiceState } from './voice';

export interface Guild<T = unknown> {
    id: string;
    name: string;
    icon?: string;
    icon_hash?: string;
    splash?: string;
    discovery_splash?: string;
    owner?: T extends 'GET_USER' ? boolean : never;
    owner_id: string;
    permissions?: T extends 'GET_USER' ? string : never;
    afk_channel_id?: string;
    afk_timeout: number;
    widget_enabled?: boolean;
    widget_channel_id?: string;
    verification_level: VerificationLevel;
    default_message_notifications: DefaultMessageNotificationLevel;
    explicit_content_filter: ExplicitContentFilterLevel;
    roles: Role[];
    emojis: Emoji[];
    features: GuildFeatures[];
    mfa_level: MFALevel;
    application_id?: string;
    system_channel_id?: string;
    system_channel_flags: SystemChannelFlags;
    rules_channel_id?: string;
    joined_at?: T extends 'GUILD_CREATE' ? number : never;
    large?: T extends 'GUILD_CREATE' ? boolean : never;
    unavailable?: T extends 'GUILD_CREATE' ? boolean : never;
    member_count?: T extends 'GUILDS_CREATE' ? number : never;
    voice_states?: T extends 'GUILD_CREATE' ? VoiceState[] : never;
    members?: T extends 'GUILD_CREATE' ? GuildMember[] : never;
    channels?: T extends 'GUILD_CREATE' ? Channel[] : never;
    threads?: T extends 'GUILD_CREATE' ? Channel[] : never;
    presences?: T extends 'GUILD_CREATE' ? PresenceUpdateEvent[] : never;
    max_presences?: T extends 'GUILD_CREATE' ? number : never;
    max_members?: T extends 'GUILD_CREATE' ? number : never;
    vanity_url_code?: string;
    description?: string;
    banner?: string;
    premium_tier: PremiumTier;
    premium_subscription_count?: number;
    preferred_locale?: string;
    public_updates_channel_id?: string;
    max_video_channel_users?: number;
    approximate_member_count?: number;
    approximate_presence_count?: number;
    welcome_screen?: WelcomeScreen;
    nsfw_level: GuildNSFWLevel;
    stage_instances?: T extends 'GUILD_CREATE' ? StageInstance[] : never;
    stickers?: Sticker[];
}

export type CreateGuild = { name: string } & Partial<{
    icon: string;
    verfication_level: VerificationLevel;
    default_message_notifications: DefaultMessageNotificationLevel;
    explicit_content_filter: ExplicitContentFilterLevel;
    roles: Role[];
    channels: Partial<Channel>[];
    afk_channel_id: string;
    afk_timeout: number;
    system_channel_id: string;
    system_channel_flags: SystemChannelFlags;
}>;

export interface GetGuild {
    with_counts?: boolean;
}

export type ModifyGuild = Partial<{
    name: string;
    verification_level: VerificationLevel | null;
    default_message_notifications: DefaultMessageNotificationLevel | null;
    explicit_content_filter: ExplicitContentFilterLevel | null;
    afk_channel_id: string | null;
    afk_timeout: number;
    icon: string | null;
    owner_id: string;
    splash: string | null;
    discovery_splash: string | null;
    banner: string | null;
    system_channel_id: string | null;
    system_channel_flags: SystemChannelFlags;
    rules_channel_id: string | null;
    public_updates_channel_id: string | null;
    preferred_locale: string | null;
    features: GuildFeatures[];
    description: string | null;
}>;

export type GuildFeatures =
    | 'ANIMATED_ICON'
    | 'BANNER'
    | 'COMMERCE'
    | 'COMMUNITY'
    | 'DISCOVERABLE'
    | 'FEATURABLE'
    | 'INVITE_SPLASH'
    | 'MEMBER_VERIFICATION_GATE_ENABLED'
    | 'MONETIZATION_ENABLED'
    | 'MORE_STICKERS'
    | 'NEWS'
    | 'PARTNERED'
    | 'PREVIEW_ENABLED'
    | 'PRIVATE_THREADS'
    | 'ROLE_ICONS'
    | 'SEVEN_DAY_THREAD_ARCHIVE'
    | 'THREE_DAY_THREAD_ARCHIVE'
    | 'TICKETED_EVENTS_ENABLED'
    | 'VANITY_URL'
    | 'VERIFIED'
    | 'VIP_REGIONS'
    | 'WELCOME_SCREEN_ENABLED';

export interface WelcomeScreen {
    description: string | null;
    welcome_channels: WelcomeScreenChannel[];
}

export interface WelcomeScreenChannel {
    channel_id: string;
    description: string;
    emoji_id: string | null;
    emoji_name: string | null;
}

export type ModifyGuildWelcomeScreen = Partial<{
    enabled: boolean;
    welcome_channels: WelcomeScreenChannel[];
    description: string;
}>;

export enum VerificationLevel {
    None = 0,
    Low,
    Medium,
    High,
    VeryHigh
}

export enum DefaultMessageNotificationLevel {
    AllMessages = 0,
    OnlyMentions
}

export enum ExplicitContentFilterLevel {
    Disabled = 0,
    MembersWithoutRoles,
    AllMembers
}

export enum MFALevel {
    None = 0,
    Elevated = 1
}

export enum SystemChannelFlags {
    SuppressJoinNotifications = 1 << 0,
    SuppressPremiumSubscriptions = 1 << 1,
    SuppressGuildReminderNotifications = 1 << 2
}

export enum GuildNSFWLevel {
    Default = 0,
    Explicit,
    Safe,
    AgeRestricted
}

export interface GuildPreview {
    id: string;
    name: string;
    icon: string | null;
    splash: string | null;
    discovery_splash: string | null;
    emojis: Emoji[];
    features: GuildFeatures[];
    approximate_member_count: number;
    approximate_presence_count: number;
    description: string | null;
}

export interface GuildWidget {
    enabled: boolean;
    channel_id: string | null;
}

export interface Role {
    id: string;
    name: string;
    color: number;
    hoist: boolean;
    icon?: string | null;
    unicode_emoji?: string | null;
    position: number;
    permissions: string;
    managed: boolean;
    mentionable: boolean;
    tags?: RoleTag;
}

export type CreateGuildRole = Partial<{
    name: string;
    permissions: string;
    color: string;
    hoist: boolean;
    icon: string;
    unicoce_emoji: string | null;
    mentionable: boolean;
}>;

export interface ModifyGuildRolePosition {
    id: string;
    position?: number | null;
}

export type ModifyGuildRole = Partial<{
    name: string;
    permissions: string;
    color: string;
    hoist: boolean;
    icon?: string;
    unicode_emoji?: string;
    mentionable: boolean;
}>;

export interface RoleTag {
    bot_id?: string;
    integration_id?: string;
    premium_subscriber?: null;
}

export enum PremiumTier {
    None = 0,
    Tier1,
    Tier2,
    Tier3
}

export interface GuildMember {
    user?: User;
    nick?: string | null;
    avatar?: string | null;
    roles: Role[];
    joined_at: string;
    premium_since?: string | null;
    deaf: boolean;
    mute: boolean;
    pending?: boolean;
    permissions?: string;
    communication_disabled_until?: Nullable<string>;
}

export interface ListGuildMembers {
    limit: number;
    after: string;
}

export interface SearchGuildMembers {
    query: string;
    limit: number;
}

export interface AddGuildMember {
    access_token: string;
    nick: string;
    roles: string[];
    mute: boolean;
    deaf: boolean;
}

export type ModifyGuildMember = Partial<{
    nick: string;
    roles: string[];
    mute: boolean;
    deaf: boolean;
    channel_id: string;
}>;

export interface ModifyCurrentMember {
    nick?: string | null;
}

export interface ModifyCurrentUserNick {
    nick?: string | null;
}

export interface Integration {
    id: string;
    name: string;
    type: 'twicth' | 'youtube' | 'discord';
    enabled: boolean;
    syncing?: boolean;
    role_id?: string;
    enable_emoticons?: boolean;
    expire_behavior: IntegrationExpireBehavior;
    expire_grace_period?: number;
    user?: User;
    account: IntegrationAccount;
    synced_at?: string;
    subscriber_count?: number;
    revoked?: boolean;
    application?: IntegrationApplication;
}

export enum IntegrationExpireBehavior {
    RemoveRole = 0,
    Kick
}

export interface IntegrationAccount {
    id: string;
    name: string;
}

export interface IntegrationApplication {
    id: string;
    name: string;
    icon: string | null;
    description: string;
    summary: string;
    bot?: User;
}

export interface CreateBan {
    delete_message_days?: number;
    reason?: string;
}

export type QueryBan = {
    limit?: number;
} & (
    | {
          before?: string;
          after?: never;
      }
    | {
          before?: never;
          after?: string;
      }
);

export interface Ban {
    reason: string;
    user: User;
}

export interface GetGuildPruneCount {
    days: number;
    include_roles: string;
}

export interface BeginGuildPrune {
    days: number;
    compute_prune_count: boolean;
    include_roles: string;
}

export interface GetGuildWidgetImage {
    style: WidgetStyleOptions;
}

export type WidgetStyleOptions = 'shield' | 'banner1' | 'banner2' | 'banner3' | 'banner4';
