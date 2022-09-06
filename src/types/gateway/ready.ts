import { Application, Guild, User } from '../api';

export interface ReadyData {
    v: number;
    user: User;
    guilds: Guild[];
    session_id: string;
    resume_gateway_url: string;
    shard: [number, number];
    application: Partial<Application>;
}
