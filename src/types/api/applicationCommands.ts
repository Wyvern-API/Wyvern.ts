import { ChannelType } from './channel';

export interface ApplicationCommand {
    id: string;
    type?: ApplicationCommandType;
    application_id: string;
    guild_id?: string;
    name: string;
    description: string;
    options?: ApplicationCommandOption[];
    default_permission?: boolean;
    version: string;
}

export enum ApplicationCommandType {
    ChatInput = 0,
    User,
    Message
}

export interface ApplicationCommandOption {
    type: ApplicationCommandOptionType;
    name: string;
    description: string;
    required?: boolean;
    choices: ApplicationCommandOptionChoice[];
    options?: ApplicationCommandOption[];
    channel_types?: ChannelType[];
}

export interface ApplicationCommandInteractionDataOption {
    name: string;
    type: ApplicationCommandOptionType;
    value?: unknown; //TODO: Rethink about the type
    options: ApplicationCommandInteractionDataOption;
}

export enum ApplicationCommandOptionType {
    SubCommand = 0,
    SubCommandGroup,
    String,
    Integer,
    Boolean,
    User,
    Channel,
    Role,
    Mentionable,
    Number
}

export interface ApplicationCommandOptionChoice {
    name: string;
    value: string | number;
}

export interface GuildApplicationCommandPermissions {
    id: string;
    application_id: string;
    guild_id: string;
    permissions: ApplicationCommandPermissions;
}

export interface ApplicationCommandPermissions {
    id: string;
    type: ApplicationCommandPermissionType;
    permission: boolean;
}

export enum ApplicationCommandPermissionType {
    Role = 1,
    User
}

export interface CreateGlobalApplicationCommand {
    name: string;
    description: string;
    options: ApplicationCommandOption[];
    default_permission?: boolean;
    type?: ApplicationCommandType;
}

export type EditGlobalApplicationCommand = Partial<{
    name: string;
    description: string;
    options: ApplicationCommandOption[];
    default_permission?: boolean;
}>;

export interface EditApplicationCommandPermissions {
    permissions: ApplicationCommandPermissions[];
}
