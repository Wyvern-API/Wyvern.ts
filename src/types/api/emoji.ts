import { Role } from './guild';
import { User } from './user';

export interface Emoji {
    id: string | null;
    name: string | null;
    roles?: Role[];
    user?: User;
    require_colons?: boolean;
    managed?: boolean;
    animated?: boolean;
    available?: boolean;
}

export interface Reaction {
    count: number;
    me: boolean;
    emoji: Partial<Emoji>;
}

export interface GetReactions {
    after: string;
    limit: number;
}

export interface CreateGuildEmoji {
    name: string;
    image: string;
    roles: string[];
}

export interface ModifyGuildEmoji {
    name: string;
    roles: string[] | null;
}
