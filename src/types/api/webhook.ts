import { Nullable, FileContent } from '../../utils';
import { Channel, AllowedMentions } from './channel';
import { Guild } from './guild';
import { Component } from './interaction';
import { Embed } from './message';
import { User } from './user';

export interface Webhook {
    id: string;
    type: WebhookType;
    guild_id?: string;
    channel_id: Nullable<string>;
    user?: User;
    name: Nullable<string>;
    avatar: Nullable<string>;
    token?: string;
    application_id: Nullable<string>;
    source_guild?: Partial<Guild>;
    source_channel?: Partial<Channel>;
    url?: string;
}

export enum WebhookType {
    Incoming = 0,
    ChannelFollower,
    Application
}

export interface CreateWebhook {
    name: string;
    avatar?: Nullable<string>;
}

export interface ModifyWebhook {
    name: string;
    avatar: Nullable<string>;
    channel_id: string;
}

export interface ExecuteWebhook {
    wait: boolean;
    thread_id: string;
    content: string;
    username: string;
    avatar_url: string;
    tts: boolean;
    file: FileContent[];
    embeds: Embed[];
    payload_json: string;
    allowed_mentions: AllowedMentions;
    components: Component[];
}
