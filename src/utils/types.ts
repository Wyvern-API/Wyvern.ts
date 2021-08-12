export type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
    ? `${Lowercase<T>}${Capitalize<SnakeToCamelCase<U>>}`
    : Lowercase<S>;
