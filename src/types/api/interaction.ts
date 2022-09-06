import { AllowedMentions, Component, Embed } from '.';
import { ApplicationCommandType, ApplicationCommandInteractionDataOption } from './applicationCommands';
import { Channel } from './channel';
import { ComponentType } from './components';
import { GuildMember, Role } from './guild';
import { Message } from './message';
import { User } from './user';

export interface Interaction {
    id: string;
    application_id: string;
    type: InteractionType;
    data?: InteractionData;
    guild_id?: string;
    channel_id?: string;
    member?: GuildMember;
    user?: User;
    token: string;
    version: 1;
    message?: Message;
}

export enum InteractionType {
    Ping = 0,
    ApplicationCommand,
    MessageComponent
}

export interface InteractionData {
    id: string;
    name: string;
    type: ApplicationCommandType;
    resolved?: ResolvedData;
    options?: ApplicationCommandInteractionDataOption;
    custom_id?: string;
    component_type?: ComponentType;
    values?: string[];
    target_id?: string;
}

export interface ResolvedData {
    users?: Record<string, User>;
    members?: Record<string, Omit<GuildMember, 'user' | 'deaf' | 'mute'>>;
    roles?: Record<string, Role>;
    channels?: Record<string, Pick<Channel, 'id' | 'name' | 'type' | 'permissions' | 'thread_metadata' | 'parent_id'>>;
    messages?: Record<string, Message>;
}

export interface InteractionResponse {
    type: InteractionType;
    data?: InteractionCallbackData;
}

export enum InteractionCallbackType {
    Pong = 1,
    ChannelMessageWithSource = 4,
    DeferredChannelMessageWithSource,
    DeferredUpdateMessage,
    UpdateMessage
}

export type InteractionCallbackData = Partial<{
    tts: boolean;
    content: string;
    embeds: Embed[];
    allowed_mentions: AllowedMentions;
    flags: InteractionCallbackDataFlags;
    components: Component[];
}>;

export enum InteractionCallbackDataFlags {
    Ephemeral = 1 << 6
}
