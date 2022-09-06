export interface AutoModerationRule {
    id: string;
    guild_id: string;
    name: string;
    creator_id: string;
    event_type: EventType;
    trigger_type: TriggerType;
    trigger_metadata: TriggerMetadata;
    actions: Action[];
    enabled: boolean;
    exempt_roles: string[];
    exempt_channels: string[];
}

export enum EventType {
    SendMessage = 1
}

export enum TriggerType {
    Keyword = 1,
    Spam = 3,
    KeywordPreset,
    MentionSpam
}

export interface TriggerMetadata {
    keyword_filter: string[];
    presets: KeywordPresetTypes[];
    allow_list: string[];
    mention_total_limit: number;
}

export enum KeywordPresetTypes {
    Profanity = 1,
    SexualContent,
    Slurs
}

export interface Action {
    type: ActionType;
    metadata?: ActionMetadata;
}

export enum ActionType {
    BlockMessage = 1,
    SendAlertMessage,
    Timeour
}

export interface ActionMetadata {
    channel_id: string;
    duration_seconds: number;
}

export interface CreateAutoModerationRule {
    name: string;
    event_type: EventType;
    trigger_type: TriggerType;
    trigger_metadata?: TriggerMetadata;
    actions: Action[];
    enabled?: boolean;
    exempt_roles?: string[];
    exempt_channels?: string[];
}

export interface ModifyAutoModerationRule {
    name: string;
    event_type: EventType;
    trigger_type: TriggerType;
    trigger_metadata?: TriggerMetadata;
    actions: Action[];
    enabled: boolean;
    exempt_roles: string[];
    exempt_channels: string[];
}
