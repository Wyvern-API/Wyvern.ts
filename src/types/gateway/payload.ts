import { Events } from './events';
import { OpCodes } from './opcodes';

export interface Payload {
    op: OpCodes;
    d?: unknown;
    s: number;
    t: Events;
}

export interface ResponsePayload {
    op: OpCodes;
    d?: unknown;
}
