describe('Tests the client options', () => {
    it('Should find the discord bot token', () => {
        expect(process.env.WYVERN_TEST_TOKEN).not.toBeUndefined();
    });
});
