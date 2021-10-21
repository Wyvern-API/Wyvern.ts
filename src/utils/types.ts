import { Blob } from 'buffer';

export type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
    ? `${Lowercase<T>}${Capitalize<SnakeToCamelCase<U>>}`
    : Lowercase<S>;

export type Nullable<T> = T | null;

export interface FileContent {
    name: string;
    blob: Blob;
}
