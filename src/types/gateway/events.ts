import { SnakeToCamelCase } from '../../utils/types';

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
    | 'WEBHOOKS_UPDATE';

export type EventNames = {
    [T in Events]: SnakeToCamelCase<T>;
};
