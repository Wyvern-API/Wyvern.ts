import { Application } from './application';
import { Channel } from './channel';
import { Guild, GuildMember } from './guild';
import { User } from './user';

export interface Invite {
    code: string;
    guild?: Partial<Guild>;
    channel: Partial<Channel>;
    inviter?: User;
    target_type?: InviteTargetType;
    target_user?: User;
    target_application?: Partial<Application>;
    approximate_presence_count?: number;
    approximate_member_count?: number;
    expires_at?: string | null;
    stage_instance?: InviteStageInstance;
}

export enum InviteTargetType {
    Stream = 1,
    EmbeddedApplication
}

export interface InviteMetadata {
    uses: number;
    max_uses: number;
    max_age: number;
    temporary: boolean;
    created_at: string;
}

export interface InviteStageInstance {
    members: Partial<GuildMember>[];
    particiant_count: number;
    speaker_count: number;
    topic: string;
}

export interface GetInvite {
    with_counts?: boolean;
    with_expiration?: boolean;
}
