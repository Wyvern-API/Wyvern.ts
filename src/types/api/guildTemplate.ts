import { Nullable } from '../../utils';
import { Guild } from './guild';
import { User } from './user';

export interface GuildTemplate {
    code: string;
    name: string;
    description: Nullable<string>;
    usage_count: number;
    creator_id: string;
    creator: User;
    created_at: string;
    updated_at: string;
    source_guild_id: string;
    serialized_source_guild: Partial<Guild>;
    is_dirty: Nullable<boolean>;
}

export interface CreateGuildFromTemplate {
    name: string;
    icon?: string;
}

export interface CreateTemplate {
    name: string;
    description?: Nullable<string>;
}

export interface ModifyGuildTemplate {
    name?: string;
    description?: Nullable<string>;
}
