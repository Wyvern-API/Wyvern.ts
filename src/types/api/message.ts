import { FileContent } from '../../utils';
import { Application } from './application';
import { Channel, ChannelMention, AllowedMentions } from './channel';
import { Component } from './components';
import { Reaction } from './emoji';
import { GuildMember, Role } from './guild';
import { InteractionType } from './interaction';
import { Sticker, StickerItem } from './sticker';
import { User } from './user';

export interface Message {
    id: string;
    channel_id: string;
    guild_id?: string;
    author: User;
    member: Partial<GuildMember>;
    content: string;
    timestamp: string;
    edited_timestamp: string;
    tts: boolean;
    mention_everyone: boolean;
    mentions: (User & Partial<GuildMember>)[];
    mention_roles: Role[];
    mention_channels: ChannelMention;
    attachments: Attachment[];
    embeds: Embed[];
    reactions?: Reaction[];
    nonce: string | number;
    pinned: boolean;
    webhook_id?: string;
    type: MessageType;
    activity: MessageActivity;
    application: Application;
    application_id: string;
    message_reference: Message;
    flags: MessageFlags;
    interaction?: MessageInteraction;
    thread: Channel;
    components: Component[];
    sticker_items?: StickerItem[];
    stickers: Sticker[];
}

export enum MessageType {
    Default = 0,
    RecipientAdd,
    RecipientRemove,
    Call,
    ChannelNameChange,
    ChannelIconChange,
    ChannelPinnedMessage,
    GuildMemberIcon,
    UserPremiumGuildSubscription,
    UserPremiumGuildSubscriptionTier1,
    UserPremiumGuildSubscriptionTier2,
    UserPremiumGuildSubscriptionTier3,
    ChannelFollowAdd,
    GuildDiscoveryDisqualified,
    GuildDiscoveryRequalified,
    GuildDiscoveryGracePeriodInitialWarning,
    GuildDiscoveryGracePeriodFinalWarning,
    ThreadCreated,
    Reply,
    ChatInputCommand,
    ThreadStarterMessage,
    GuildInviteReminder,
    ContextMenuCommand
}

export enum MessageFlags {
    Crossposted = 1 << 0,
    IsCrosspost = 1 << 1,
    SuppressEmbeds = 1 << 2,
    SourceMessageDeleted = 1 << 3,
    Urgent = 1 << 4,
    HasThread = 1 << 5,
    Ephemeral = 1 << 6,
    Loading = 1 << 7
}

export interface MessageReference {
    message_id?: string;
    channel_id?: string;
    guild_id?: string;
    fail_if_not_exists?: boolean;
}

export interface MessageInteraction {
    id: string;
    type: InteractionType;
    name: string;
    user: User;
}

export interface MessageActivity {
    type: MessageActivityType;
    party_id?: string;
}

export enum MessageActivityType {
    Join = 1,
    Spectate,
    Listen,
    JoinRequest = 5
}

export type CreateMessage = Partial<{
    content: string;
    tts: boolean;
    file: FileContent[];
    embeds: Embed[];
    payload_json: string;
    allowed_mentions: AllowedMentions;
    message_reference: MessageReference;
    components: Component[];
    sticker_ids: string[];
}>;

export type ModifyMessage = Partial<{
    content: string;
    embeds: Embed[];
    flags: MessageFlags;
    file: FileContent[];
    payload_json: string;
    allowed_mentions: AllowedMentions;
    attachments: Attachment[];
    components: Component[];
}>;

export type Embed = Partial<{
    title: string;
    type: EmbedType;
    description: string;
    url: string;
    timestamp: string;
    color: number;
    footer: EmbedFooter;
    image: EmbedThumbnail;
    thumbnail: EmbedThumbnail;
    video: Partial<EmbedThumbnail>;
    provider: EmbedProvider;
    author: EmbedAuthor;
    fields: EmbedField[];
}>;

export type EmbedType = 'rich' | 'image' | 'video' | 'gifv' | 'article' | 'link';

export interface EmbedThumbnail {
    url: string;
    proxy_url?: string;
    height?: number;
    width?: number;
}

export interface EmbedProvider {
    name?: string;
    url?: string;
}

export interface EmbedAuthor {
    name: string;
    url?: string;
    icon_url?: string;
    proxy_icon_url?: string;
}

export interface EmbedFooter {
    text: string;
    icon_url?: string;
    proxy_icon_url?: string;
}

export interface EmbedField {
    name: string;
    value: string;
    inline?: boolean;
}

export interface Attachment {
    id: string;
    filename: string;
    content_type?: string;
    size: number;
    url: string;
    proxy_url: string;
    height?: number | null;
    width?: number | null;
    ephemeral?: boolean;
}
