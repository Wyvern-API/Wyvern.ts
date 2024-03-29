import { GuildMember } from './guild';

export interface VoiceState {
    guild_id?: string;
    channel_id: string | null;
    user_id: string;
    member?: GuildMember;
    session_id: string;
    deaf: boolean;
    mute: boolean;
    self_deaf: boolean;
    self_mute: boolean;
    self_stream?: boolean;
    self_video: boolean;
    suppress: boolean;
    request_to_speak_timestamp: string | null;
}

export interface ModifyCurrentUserVoiceState {
    channel_id: string;
    suppress?: string;
    request_to_speak_timestamp?: string | null;
}

export interface ModifyUserVoiceState {
    channel_id: string;
    suppress?: string;
}

export interface VoiceRegion {
    id: string;
    name: string;
    optimal: boolean;
    deprecated: boolean;
    custom: boolean;
}
