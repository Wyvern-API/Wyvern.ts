export enum OpCodes {
    Dispatch = 0,
    Heartbeat,
    Idenitfy,
    PresenceUpdate,
    VoiceStateUpdate,
    Resume = 6,
    Reconnect,
    RequestGuildMembers,
    InvalidSession,
    Hello,
    HeartbeatAck
}
