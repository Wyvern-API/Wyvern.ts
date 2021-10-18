export interface StageInstance {
    id: string;
    guild_id: string;
    channel_id: string;
    topic: string;
    privacy_level: PrivacyLevel;
    discoverable_enabled: boolean;
}

export enum PrivacyLevel {
    Public = 0,
    GuildOnly
}

export interface CreateStageInstance {
    channel_id: string;
    topic: string;
    privacy_level: PrivacyLevel;
}

export interface ModifyStageInstance {
    topic?: string;
    privacy_level?: PrivacyLevel;
}
