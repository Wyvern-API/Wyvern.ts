import { Emoji } from '../api/emoji';
import { User } from '../api/user';

export interface PresenceUpdateEvent {
    user: User;
    guild_id: string;
    status: StatusType;
    activities: Activity[];
    client_status: ClientStatus;
}

export interface GatewayPresenceUpdate {
    since: number | null;
    activities: Activity[];
    status: StatusType;
    afk: boolean;
}

export type StatusType = 'idle' | 'dnd' | 'online' | 'invisible' | 'offline';

export interface ClientStatus {
    desktop?: string;
    mobile?: string;
    web?: string;
}

export interface Activity {
    name: string;
    type: ActivityType;
    url?: string | null;
    created_at: number;
    timestamps?: Timestamp;
    application_id?: string;
    details?: string | null;
    state?: string | null;
    emoji?: Emoji | null;
    party?: Party;
    assets?: Asset;
    secrets?: Secret;
    instance?: boolean;
    flags?: ActivityFlags;
}

export enum ActivityType {
    Game = 0,
    Streaming,
    Listening,
    Watching,
    Custom,
    Competing
}

export enum ActivityFlags {
    Instance = 1 << 0,
    Join = 1 << 1,
    Spectate = 1 << 2,
    JoinRequest = 1 << 3,
    Sync = 1 << 4,
    Play = 1 << 5
}

export interface Timestamp {
    start?: number;
    end?: number;
}

export interface Party {
    id?: string;
    size: [number, number];
}

export interface Asset {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
}

export interface Secret {
    join?: string;
    spectate?: string;
    match?: string;
}
