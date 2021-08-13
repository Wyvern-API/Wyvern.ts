import { Events } from './events';
import { OpCodes } from './opcodes';

export interface Payload extends ResponsePayload {
    s: number;
    t: Events;
}

export interface ResponsePayload {
    op: OpCodes;
    d: unknown;
}
