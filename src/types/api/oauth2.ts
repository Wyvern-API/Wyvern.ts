import { Application } from './application';
import { User } from './user';

export type Scope =
    | 'activities.read'
    | 'activities.write'
    | 'applications.builds.read'
    | 'applications.builds.upload'
    | 'applications.commands'
    | 'applications.commands.update'
    | 'applications.entitlements'
    | 'applications.store.update'
    | 'bot'
    | 'connections'
    | 'email'
    | 'gmd.join'
    | 'guilds'
    | 'guilds.join'
    | 'identify'
    | 'messages.read'
    | 'relationships.read'
    | 'rpc'
    | 'rpc.activities.write'
    | 'rpc.notifications.read'
    | 'rpc.voice.read'
    | 'rpc.voice.write'
    | 'webhook.incoming';

export interface BotAuthorizationParameters {
    client_id: string;
    scopes: Scope[];
    permissions: string;
    guild_id: string;
    disable_guild_select: boolean;
}

export interface GetCurrentAuthorizationInformation {
    application: Partial<Application>;
    scopes: Scope[];
    expires: string;
    user?: User;
}
