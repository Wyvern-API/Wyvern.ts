import { Overwrite, Role } from '.';
import { Nullable } from '../../utils';
import { Channel } from './channel';
import { Integration } from './guild';
import { User } from './user';
import { Webhook } from './webhook';

export interface AuditLog {
    audit_log_entries: AuditLogEntry[];
    integrations: Partial<Integration>[];
    threads: Channel[];
    users: User[];
    webhooks: Webhook[];
}

export interface AuditLogEntry {
    target_id: Nullable<string>;
    changes?: AuditLogChange[];
    user_id: Nullable<string>;
    id: string;
    action_type: AuditLogActionType;
    options?: OptionalAuditLogEntryInfo;
    reason?: string;
}

export enum AuditLogActionType {
    GuildUpdate = 1,
    ChannelCreate = 10,
    ChannelUpdate,
    ChannelDelete,
    ChannelOverwriteCreate,
    ChannelOverwriteUpdate,
    ChannelOverwriteDelete,
    MemberKick = 20,
    MemberPrune,
    MemberBanAdd,
    MemberBanRemove,
    MemberUpdate,
    MemberRoleUpdate,
    MemberMove,
    MemberDisconnect,
    BotAdd,
    RoleCreate,
    RoleUpdate,
    RoleDelete,
    InviteCreate = 40,
    InviteUpdate,
    InviteDelete,
    WebhookCreate = 50,
    WebhookUpdate,
    WebhookDelete,
    EmojiCreate = 60,
    EmojiUpdate,
    EmojiDelete,
    MessageDelete = 72,
    MessageBulkDelete,
    MessagePin,
    MessageUnpin,
    IntegrationCreate = 80,
    IntegrationUpdate,
    IntegrationDelete,
    StageInstanceCreate,
    StageInstanceUpdate,
    StageInstanceDelete,
    StickerCreate = 90,
    StickerUpdate,
    StickerDelete,
    ThreadCreate = 110,
    ThreadUpdate,
    ThreadDelete
}

export interface OptionalAuditLogEntryInfo {
    channel_id: string;
    count: string;
    delete_member_days: string;
    id: string;
    members_removed: string;
    message_id: string;
    role_name: string;
    type: string;
}

export type AuditLogChange =
    | {
          new_value: string;
          old_value: string;
          key:
              | 'name'
              | 'asset'
              | 'avatar_hash'
              | 'banner_hash'
              | 'afk_channel_id'
              | 'application_id'
              | 'channel_id'
              | 'code'
              | 'deny'
              | 'description'
              | 'discovery_splash_hash'
              | 'guild_id'
              | 'id'
              | 'inviter_id'
              | 'name'
              | 'nick'
              | 'owner_id'
              | 'permissions'
              | 'prefered_locale'
              | 'public_updates_channel_id'
              | 'rules_channel_id'
              | 'splash_hash'
              | 'system_channel_id'
              | 'tags'
              | 'topic'
              | 'unicode_emoji'
              | 'vanity_url_code'
              | 'widget_channel_id';
      }
    | {
          new_value: number;
          old_value: number;
          key:
              | 'afk_timeout'
              | 'auto_archive_duration'
              | 'bitrate'
              | 'color'
              | 'default_archive_duration'
              | 'default_message_notifications'
              | 'expire_behavior'
              | 'expire_grace_period'
              | 'explicit_content_filter'
              | 'max_age'
              | 'max_uses'
              | 'mfa_level'
              | 'format_type'
              | 'position'
              | 'privacy_level'
              | 'prune_delete_days'
              | 'rate_limit_per_user'
              | 'user_limit'
              | 'uses'
              | 'verification_level';
      }
    | {
          new_value: Partial<Role>[];
          old_value: Partial<Role>[];
          key: '$add' | '$remove';
      }
    | {
          new_value: boolean;
          old_value: boolean;
          key:
              | 'available'
              | 'deaf'
              | 'enable_emoticons'
              | 'hoist'
              | 'mentionable'
              | 'mute'
              | 'nsfw'
              | 'temporary'
              | 'widget_enabled';
      }
    | {
          new_value: Overwrite[];
          old_value: Overwrite[];
          key: 'permission_overwrites';
      }
    | {
          new_value: string | number;
          old_value: string | number;
          key: 'type';
      };

export interface GetAuditLog {
    user_id: string;
    action_type: AuditLogActionType;
    before: string;
    limit: number;
}
