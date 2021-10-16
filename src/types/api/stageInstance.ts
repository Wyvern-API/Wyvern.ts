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
