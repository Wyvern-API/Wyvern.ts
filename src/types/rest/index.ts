import { Nullable } from '../..';
import {
    Guild,
    CreateGuild,
    GuildPreview,
    CreateGuildRole,
    Role,
    Channel,
    ListActiveThreads,
    GuildMember,
    GetGuildPruneCount,
    ModifyGuild,
    ModifyCurrentUserNick,
    ModifyGuildChannelPosition,
    ModifyGuildRole,
    ModifyGuildRolePosition,
    SearchGuildMembers,
    AddGuildMember,
    ModifyGuildMember,
    User,
    BeginGuildPrune,
    VoiceRegion,
    Invite,
    InviteMetadata,
    Integration,
    GuildWidget,
    WidgetStyleOptions,
    WelcomeScreen,
    ModifyGuildWelcomeScreen,
    ModifyCurrentUserVoiceState,
    ModifyUserVoiceState,
    ModifyDMChannel,
    ModifyGuildChannel,
    ModifyThreadChannel,
    GetChannelMessages,
    Message,
    CreateMessage,
    GetReactions,
    ModifyMessage,
    ModifyChannelPermissions,
    CreateChannelInvite,
    FollowedChannel,
    AddGroupDMRecipient,
    StartThreadWithMessage,
    StartThreadWithoutMessage,
    ThreadMember,
    ListArchivedThreads,
    AuditLog,
    GetAuditLog,
    Emoji,
    ModifyGuildEmoji,
    GuildTemplate,
    ModifyGuildTemplate,
    GetInvite,
    CreateStageInstance,
    StageInstance,
    ModifyStageInstance,
    Sticker,
    CreateGuildSticker,
    ModifyGuildSticker,
    StickerPack,
    ModifyCurrentUser,
    GetCurrentUserGuilds,
    CreateDM,
    CreateGroupDM,
    Connection,
    Webhook,
    ModifyWebhook,
    ExecuteWebhook,
    ApplicationCommand,
    GuildApplicationCommandPermissions,
    InteractionResponse,
    CreateGuildChannel,
    GetGuild
} from '../api';

export type RequestMethod = 'get' | 'post' | 'patch' | 'delete' | 'put';

export type Options<
    T extends { query?: unknown; data?: unknown } = {
        query: unknown;
        data: unknown;
    }
> = Partial<{
    query: T['query'];
    data: T['data']; // eslint-disable-line @typescript-eslint/no-explicit-any
    headers: string[]; // eslint-disable-line @typescript-eslint/no-explicit-any
    files: unknown[]; //TODO: make a type for files
    userAgentSuffix: string[];
    payloadJson: boolean;
    versioned: boolean;
    auth: boolean;
    reason: string;
}>;

export interface Request<
    T extends {
        response: Partial<{
            get: unknown;
            post: unknown;
            delete: unknown;
            patch: unknown;
            put: unknown;
        }>;
        options: Partial<{
            get: {
                query?: unknown;
                data?: unknown;
            };
            post: {
                query?: unknown;
                data?: unknown;
            };
            delete: {
                query?: unknown;
                data?: unknown;
            };
            patch: {
                query?: unknown;
                data?: unknown;
            };
            put: {
                query?: unknown;
                data?: unknown;
            };
        }>;
    }
> {
    get(options?: Options<T['options']['get'] & {}>): Promise<T['response']['get']>; // eslint-disable-line @typescript-eslint/ban-types
    post(options?: Options<T['options']['post'] & {}>): Promise<T['response']['post']>; // eslint-disable-line @typescript-eslint/ban-types
    delete(options?: Options<T['options']['delete'] & {}>): Promise<T['response']['delete']>; // eslint-disable-line @typescript-eslint/ban-types
    patch(options?: Options<T['options']['patch'] & {}>): Promise<T['response']['patch']>; // eslint-disable-line @typescript-eslint/ban-types
    put(options?: Options<T['options']['put'] & {}>): Promise<T['response']['put']>; // eslint-disable-line @typescript-eslint/ban-types
}

export interface APIEndpoints {
    guilds: Request<{ response: { post: Guild }; options: { post: { data: CreateGuild } } }> & {
        (id: string): Request<{
            response: { get: Guild; delete: never; patch: Guild };
            options: {
                get: { query: GetGuild };
                patch: { data: ModifyGuild };
            };
        }> & {
            preview: Request<{ response: { get: GuildPreview }; options: never }>;
            channels: Request<{
                response: { get: Channel[]; post: Channel; patch: never };
                options: { post: { data: CreateGuildChannel }; patch: { data: ModifyGuildChannelPosition } };
            }> & {
                (id: string): Request<{ response: { get: Channel }; options: never }>;
            };
            threads: {
                active: Request<{ response: { get: Omit<ListActiveThreads, 'has_more'> }; options: never }>;
            };
            members: Request<{
                response: { get: GuildMember[] };
                options: { get: { query: { limit: number; after: string } } };
            }> & {
                search: Request<{ response: { get: GuildMember[] }; options: { get: { query: SearchGuildMembers } } }>;
                '@me': Request<{
                    response: { patch: GuildMember };
                    options: { patch: { data: ModifyCurrentUserNick } };
                }>;
            } & {
                (id: string): Request<{
                    response: { get: GuildMember; delete: never; patch: GuildMember; put: GuildMember | never };
                    options: { patch: { data: ModifyGuildMember }; put: { data: AddGuildMember } };
                }> & {
                    roles(id: string): Request<{
                        response: never;
                        options: never;
                    }>;
                };
            };
            roles: Request<{
                response: { get: Role[]; post: Role; patch: Role[] };
                options: { post: { data: CreateGuildRole }; patch: { data: ModifyGuildRolePosition[] } };
            }> & {
                (id: string): Request<{
                    response: { patch: Role; delete: never };
                    options: { patch: { data: ModifyGuildRole } };
                }>;
            };
            bans: Request<{ response: { get: User[] }; options: never }> & {
                (id: string): Request<{
                    response: never;
                    options: { put: { data: { delete_message_days: number; reason: string } } };
                }>;
            };
            prune: Request<{
                response: { get: number; post: number };
                options: { get: { query: GetGuildPruneCount }; post: { data: BeginGuildPrune } };
            }>;
            regions: Request<{ response: { get: VoiceRegion[] }; options: never }>;
            invites: Request<{ response: { get: Invite & InviteMetadata }; options: never }>;
            integrations: Request<{ response: { get: Integration[] }; options: never }> & {
                (id: string): Request<{ response: never; options: never }>;
            };
            widget: Request<{ response: { get: GuildWidget }; options: never }>;
            'widget.json': Request<{ response: { get: unknown }; options: never }>;
            'vanity-url': Request<{
                response: { get: Pick<Invite & InviteMetadata, 'code' | 'uses'> };
                options: never;
            }>;
            'widget.png': Request<{ response: never; options: { get: { query: WidgetStyleOptions } } }>;
            'welcome-screen': Request<{
                response: { get: WelcomeScreen; patch: WelcomeScreen };
                options: { patch: { data: ModifyGuildWelcomeScreen } };
            }>;
            'voice-states': {
                '@me': Request<{ response: never; options: { patch: { data: ModifyCurrentUserVoiceState } } }>;
            } & {
                (id: string): Request<{ response: never; options: { patch: { data: ModifyUserVoiceState } } }>;
            };
            'audit-logs': Request<{ response: { get: AuditLog }; options: { get: { query: GetAuditLog } } }>;
            emojis: Request<{ response: { get: Emoji[] }; options: never }> & {
                (id: string): Request<{
                    response: { patch: Emoji; delete: never };
                    options: { patch: { data: ModifyGuildEmoji }; delete: never };
                }>;
            };
            templates: Request<{
                response: { get: GuildTemplate; post: GuildTemplate };
                options: { get: never; post: { data: { name: string; description?: Nullable<string> } } };
            }> & {
                (id: string): Request<{
                    response: {
                        put: GuildTemplate;
                        patch: GuildTemplate;
                        delete: GuildTemplate;
                    };
                    options: { patch: { data: ModifyGuildTemplate } };
                }>;
            };
            stickers: Request<{
                response: { get: Sticker[]; post: Sticker; patch: Sticker; delete: never };
                options: { post: { data: CreateGuildSticker }; patch: { data: ModifyGuildSticker }; delete: never };
            }> & {
                (id: string): Request<{ response: { get: Sticker }; options: never }>;
            };
            webhooks: Request<{ response: { get: Webhook[] }; options: never }>;
        };
    } & {
        templates(id: string): Request<{
            response: { get: GuildTemplate; post: GuildTemplate };
            options: { get: never; post: { data: { name: string; icon?: string } } };
        }>;
    };
    channels(id: string): Request<{
        response: { get: Channel; patch: Channel; delete: Channel };
        options: { patch: { data: ModifyDMChannel | ModifyGuildChannel | ModifyThreadChannel } };
    }> & {
        messages: Request<{
            response: { get: Message[]; post: Message; patch: Message; delete: never };
            options: {
                get: { query: GetChannelMessages };
                post: { data: CreateMessage };
                patch: { data: ModifyMessage };
                delete: never;
            };
        }> & {
            (id: string): Request<{ response: { get: Message }; options: never }> & {
                crosspost: Request<{ response: { put: Message }; options: never }>;
                reactions: Request<{ response: never; options: never }> & {
                    (id: string): Request<{ response: { get: User[] }; options: { get: { query: GetReactions } } }> & {
                        '@me': Request<{ response: never; options: never }>;
                    } & {
                        (id: string): Request<{ response: never; options: never }>;
                    };
                };
                threads: Request<{ response: { post: Channel }; options: { post: { data: StartThreadWithMessage } } }>;
            };
        } & {
            'bulk-delete': Request<{ response: never; options: { post: { data: { messages: Message[] } } } }>;
        };
        threads: Request<{ response: { post: Channel }; options: { post: { data: StartThreadWithoutMessage } } }> & {
            active: Request<{ response: { get: ListActiveThreads }; options: never }>;
            archived: {
                //the types names feel wrong, I just wasn't bothered recreating the same types with different names
                public: Request<{
                    response: { get: ListActiveThreads };
                    options: { get: { query: ListArchivedThreads } };
                }>;
                private: Request<{
                    response: { get: ListActiveThreads };
                    options: { get: { query: ListArchivedThreads } };
                }>;
            };
        };
        'thread-members': Request<{ response: { get: ThreadMember[] }; options: never }> & {
            '@me': Request<{ response: never; options: never }>;
        } & {
            (id: string): Request<{ response: { get: ThreadMember; put: never; delete: never }; options: never }>;
        };
        users: {
            '@me': {
                threads: {
                    achived: {
                        private: Request<{
                            response: { get: ListActiveThreads };
                            options: { get: { query: ListArchivedThreads } };
                        }>;
                    };
                };
            };
        };
        permissions(
            id: string
        ): Request<{ response: never; options: { put: { data: ModifyChannelPermissions }; delete: never } }>;
        invites: Request<{
            response: { get: (Invite & InviteMetadata)[]; post: Invite };
            options: { post: { data: CreateChannelInvite } };
        }>;
        followers: Request<{
            response: { post: FollowedChannel };
            options: { post: { data: { webhook_channel_id: string } } };
        }>;
        typing: Request<{ response: never; options: never }>;
        pins: Request<{ response: { get: Message[] }; options: never }> & {
            (id: string): Request<{ response: never; options: never }>;
        };
        recipients: {
            (id: string): Request<{ response: never; options: { put: { data: AddGroupDMRecipient }; delete: never } }>;
        };
        webhooks: Request<{ response: { get: Webhook[] }; options: never }>;
    };
    invites(id: string): Request<{ response: { get: Invite; delete: Invite }; options: { get: { query: GetInvite } } }>;
    'stage-instances': Request<{
        response: { post: StageInstance };
        options: { post: { data: CreateStageInstance } };
    }> & {
        (id: string): Request<{
            response: { get: StageInstance; patch: StageInstance; delete: never };
            options: { get: never; patch: { data: ModifyStageInstance }; delete: never };
        }>;
    };
    stickers(id: string): Request<{ response: { get: Sticker }; options: never }>;
    'sticker-pack': Request<{ response: { get: { sticker_pack: StickerPack[] } }; options: never }>;
    users: {
        '@me': Request<{
            response: { get: User; patch: User };
            options: { get: never; patch: { data: ModifyCurrentUser } };
        }> & {
            guilds: Request<{
                response: { get: Partial<Guild>[] };
                options: { get: { query: GetCurrentUserGuilds } };
            }> & {
                (id: string): Request<{ response: { delete: never }; options: never }> & {
                    member: Request<{ response: { get: GuildMember }; options: never }>;
                };
            };
            channels: Request<{ response: { post: Channel }; options: { post: { data: CreateDM | CreateGroupDM } } }>;
            connections: Request<{ response: { get: Connection[] }; options: never }>;
        };
    } & {
        (id: string): Request<{ response: { get: User }; options: never }>;
    };
    voice: {
        regions: Request<{ response: { get: VoiceRegion[] }; options: never }>;
    };
    applications(id: string): {
        commands: Request<{
            response: { get: ApplicationCommand[]; post: ApplicationCommand; put: ApplicationCommand[] };
            options: never;
        }> & {
            (id: string): Request<{
                response: { get: ApplicationCommand; patch: ApplicationCommand; delete: never };
                options: never;
            }>;
        };
        guilds(id: string): {
            commands: Request<{
                response: { get: ApplicationCommand[]; post: ApplicationCommand; put: ApplicationCommand[] };
                options: never;
            }> & {
                (id: string): Request<{
                    response: { get: ApplicationCommand; post: ApplicationCommand; delete: never };
                    options: never;
                }> & {
                    permissions: Request<{
                        response: {
                            get: GuildApplicationCommandPermissions;
                            put: GuildApplicationCommandPermissions;
                        };
                        options: never;
                    }>;
                };
            } & {
                permissions: Request<{
                    response: {
                        get: GuildApplicationCommandPermissions[];
                        put: GuildApplicationCommandPermissions;
                    };
                    options: never;
                }>;
            };
        };
    };
    interactions(
        id: string,
        token: string
    ): {
        callback: Request<{ response: never; options: never }>;
    };
    webhooks(id: string): Request<{
        response: { get: Webhook; patch: Webhook; delete: never };
        options: { get: never; patch: { data: ModifyWebhook }; delete: never };
    }> & {
        (id: string): Request<{
            response: {
                get: Omit<Webhook, 'user'>;
                patch: Omit<Webhook, 'user'>;
                post: never;
                delete: never;
            };
            options: {
                get: never;
                patch: { data: Omit<ModifyWebhook, 'channel_id'> };
                post: {
                    query: { wait: boolean; thread_id: string };
                    data: Omit<ExecuteWebhook, 'wait' | 'thread_id'>;
                };
                delete: never;
            };
        }> & {
            slack: Request<{
                response: { post: Pick<ExecuteWebhook, 'wait' | 'thread_id'> };
                options: { post: { query: { wait: number; thread_id: string } } };
            }>;
            github: Request<{
                response: { post: Pick<ExecuteWebhook, 'wait' | 'thread_id'> };
                options: { post: { query: { wait: number; thread_id: string } } };
            }>;
            messages: {
                (id: string): Request<{
                    response: { get: Message; patch: Message; delete: never };
                    options: {
                        get: { query: { thread_id: string } };
                        patch: { query: { thread_id: string }; data: Omit<ExecuteWebhook, 'wait' | 'thread_id'> };
                        delete: { query: { thread_id: string } };
                    };
                }> & {
                    '@original': Request<{
                        response: { get: InteractionResponse; patch: InteractionResponse; delete: never };
                        options: never;
                    }>;
                };
            };
        };
    };
}
