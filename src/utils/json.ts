export function stringify<T = unknown>(data: T): string {
    return JSON.stringify(data, (_, value) => (typeof value === 'bigint' ? `${value.toString()}n` : value));
}

export function parse<T = unknown>(data: string): T {
    return JSON.parse(data, (_, value) => {
        if (typeof value === 'string' && /^\d+n$/.test(value)) {
            return BigInt(value.substr(0, value.length - 1));
        }
        return value;
    }) as T;
}
