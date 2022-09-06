import { Nullable, SnakeToCamelCase } from '../../utils/types';
import {
    Action,
    Channel,
    TriggerType,
    ThreadMember,
    GuildMember,
    User,
    Emoji,
    Sticker,
    Role,
    Integration,
    Application,
    Message
} from '../api';
import { GatewayPresenceUpdate, PresenceUpdateEvent } from './presence';

export type Events =
    | 'READY'
    | 'RESUMED'
    //Guild
    | 'GUILD_CREATE'
    | 'GUILD_UPDATE'
    | 'GUILD_BAN_ADD'
    | 'GUILD_BAN_REMOVE'
    //Guild stuff
    | 'GUILD_EMOIES_UPDATE'
    | 'GUILD_STICKERS_UPDATE'
    | 'GUILD_INTEGRATIONS_UPDATE'
    //Guild members
    | 'GUILD_MEMBER_REMOVE'
    | 'GUILD_MEMBER_UPDATE'
    | 'GUILD_MEMBERS_CHUNK'
    //Guild roles
    | 'GUILD_ROLE_CREATE'
    | 'GUILD_ROLE_UPDATE'
    | 'GUILD_ROLE_DELETE'
    //Channels
    | 'CHANNEL_CREATE'
    | 'CHANNEL_UPDATE'
    | 'CHANNEL_DELETE'
    | 'CHANNEL_PINS_UPDATE'
    //Thread
    | 'THREAD_CREATE'
    | 'THREAD_UPDATE'
    | 'THREAD_DELETE'
    | 'THREAD_LIST_SYNC'
    | 'THREAD_MEMBER_UPDATE'
    | 'THREAD_MEMBERS_UPDATE'
    //Voice
    | 'VOICE_STATE_UPDATE'
    | 'VOICE_SERVER_UPDATE'
    //Stage
    | 'STAGE_INSTANCE_CREATE'
    | 'STAGE_INSTANCE_UPDATE'
    | 'STAGE_INSTANCE_DELETE'
    //Messages
    | 'MESSAGE_CREATE'
    | 'MESSAGE_UPDATE'
    | 'MESSAGE_DELETE'
    | 'MESSAGE_DELETE_BULK'
    //Messages Reactions
    | 'MESSAGE_REACTION_ADD'
    | 'MESSAGE_REACTION_REMOVE'
    | 'MESSAGE_REACTION_REMOVE_ALL'
    | 'MESSAGE_REACTION_REMOVE_EMOJIE'
    //Invites
    | 'INVITE_CREATE'
    | 'INVITE_DELETE'
    //Application
    | 'APPLICATION_COMMAND_CREATE'
    | 'APPLICATION_COMMAND_UPDATE'
    | 'APPLICATION_COMMAND_DELETE'
    //Integrations
    | 'INTEGRATION_DELETE'
    | 'INTEGRATION_CREATE'
    | 'INTEGRATION_UPDATE'
    //Interactions
    | 'INTERACTION_CREATE'
    //Presence
    | 'PRESENCE_UPDATE'
    //Typing
    | 'TYPING_START'
    //Webhooks
    | 'WEBHOOKS_UPDATE'
    //Guild Scheduled Events
    | 'GUILD_SCHEDULED_EVENT_CREATE'
    | 'GUILD_SCHEDULED_EVENT_UPDATE'
    | 'GUILD_SCHEDULED_EVENT_DELETE'
    | 'GUILD_SCHEDULED_EVENT_USER_ADD'
    | 'GUILD_SCHEDULED_EVENT_USER_REMOVE'
    //Auto Moderation Configuration
    | 'AUTO_MODERATION_RULE_CREATE'
    | 'AUTO_MODERATION_RULE_UPDATE'
    | 'AUTO_MODERATION_RULE_DELERE'
    //Auto Moderation Execution
    | 'AUTO_MODERATION_ACTION_EXECUTION';

export type EventNames = {
    [T in Events]: SnakeToCamelCase<T>;
};

export interface AutoModerationActionExecutionEvent {
    guild_id: string;
    action: Action;
    rule_id: string;
    rule_trigger_type: TriggerType;
    user_id: string;
    channel_id?: string;
    message_id?: string;
    alert_system_message_id?: string;
    content: string;
    matched_keyword: Nullable<string>;
    matched_content: Nullable<string>;
}

export interface ThreadListSync {
    guild_id: string;
    channel_ids?: string[];
    threads: Channel[];
    members: ThreadMember[];
}

export type ThreadMemberUpdateEvent = ThreadMember & {
    guild_id: string;
};

export interface ThreadMembersUpdateEvent {
    id: string;
    guild_id: string;
    member_count: number;
    added_members?: (ThreadMember & GuildMember & PresenceUpdateEvent)[];
    removed_member_ids?: string[];
}

export interface ChannelPinsUpdateEvent {
    guild_id?: string;
    channel_id: string;
    last_pin_timestamp?: Nullable<string>;
}

export interface GuildBanAddEvent {
    guild_id: string;
    user_id: User;
}

export interface GuildBanRemoveEvent {
    guild_id: string;
    user_id: User;
}

export interface GuildEmojisUpdates {
    guild_id: string;
    emojis: Emoji[];
}

export interface GuildStickersUpdateEvent {
    guild_id: string;
    stickers: Sticker[];
}

export interface GuildIntegrationsUpdateEvent {
    guild_id: string;
}

export type GuildMemberAddEvent = GuildMember & {
    guild_id: string;
};

export interface GuildMemberRemoveField {
    guild_id: string;
    user: User;
}

export interface GuildMemberChunkEvent {
    guild_id: string;
    members: GuildMember[];
    chunk_index: number;
    chunk_count: number;
    not_found?: string[];
    presences?: GatewayPresenceUpdate[];
    nonce?: string;
}

export interface GuildRoleCreateEvent {
    guild_id: string;
    role: Role;
}

export interface GuildRoleUpdateEvent {
    guild_id: string;
    role: Role;
}

export interface GuildRoleDeleteEvent {
    guild_id: string;
    role_id: string;
}

export interface GuildScheduledEventUserAddEvent {
    guild_scheduled_event_id: string;
    user_id: string;
    guild_id: string;
}

export interface GuildScheduledEventUserRemoveEvent {
    guild_scheduled_event_id: string;
    user_id: string;
    guild_id: string;
}

export type IntegrationCreateEvent = Integration & {
    guild_id: string;
};

export type IntegrationUpdateEvent = Integration & {
    guild_id: string;
};

export interface IntegrationDeleteEvent {
    id: string;
    guild_id: string;
    application_id?: string;
}

export interface InviteCreateEvent {
    channel_id: string;
    code: string;
    created_at: string;
    guild_id?: string;
    inviter?: User;
    max_age: number;
    max_uses: number;
    target_type?: number;
    target_user?: User;
    target_application?: Partial<Application>;
    temporary: boolean;
    uses: number;
}

export interface InviteDeleteEvent {
    channel_id: string;
    guild_id?: string;
    code: string;
}

export type MessageCreateEvent = Message & {
    guild_id?: string;
    member?: Partial<GuildMember>;
    mentions: (User & Partial<GuildMember>)[];
};

export interface MessageDeleteEvent {
    id: string;
    channel_id: string;
    guild_id?: string;
}

export interface MessageDeleteBulkEvent {
    ids: string[];
    channel_id: string;
    guild_id?: string;
}

export interface MessageReactionAddEvent {
    user_id: string;
    channel_id: string;
    message_id: string;
    guild_id?: string;
    member?: GuildMember;
    emoji: Partial<Emoji>;
}

export interface MessageReactionRemoveAllEvent {
    channel_id: string;
    message_id: string;
    guild_id?: string;
}

export type MessageReactionRemoveEmojiEvent = Omit<MessageReactionAddEvent, 'user_id'>;

export interface TypingStartEvent {
    channel_id: string;
    guild_id?: string;
    user_id: string;
    timestamp: string;
    member?: GuildMember;
}

export interface VoiceServerUpdateEvent {
    token: string;
    guild_id: string;
    endpoint: Nullable<string>;
}

export interface WebhookUpdateEvent {
    guild_id: string;
    channel_id: string;
}
