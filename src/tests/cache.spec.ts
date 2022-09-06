import { Client } from '..';

describe('Simple cache suite', () => {
    it('Should get values using getSync', () => {
        const client = new Client({
            config: {
                token: process.env.WYVERN_TEST_TOKEN
            },
            main: __filename
        });

        client.cache.guilds.set('1', 1);
        client.cache.guilds.set('2', 2);
        client.cache.guilds.set('3', 3);

        expect(client.cache.guilds.getSync('1')).toBe(1);
        expect(client.cache.guilds.getSync('2')).toBe(2);
        expect(client.cache.guilds.getSync('3')).toBe(3);
        expect(client.cache.guilds.getSync('5')).toBeUndefined();
    });

    it('Should get values using get (one shard)', async () => {
        const client = new Client({
            config: {
                token: process.env.WYVERN_TEST_TOKEN
            },
            main: __filename
        });

        client.cache.guilds.set('1', 1);
        client.cache.guilds.set('2', 2);
        client.cache.guilds.set('3', 3);

        expect(await client.cache.guilds.get('1')).toBe(1);
        expect(await client.cache.guilds.get('2')).toBe(2);
        expect(await client.cache.guilds.get('3')).toBe(3);
        expect(await client.cache.guilds.get('5')).toBeUndefined();
    });
    /**
     * There's no test for multiple shards mainly because I didn't get jest to work
     * with multiple threads and I get reference errors, I've no experience when it comes
     * to testing, if you know how to do it feel free to make a pull request ^^
     */
});
