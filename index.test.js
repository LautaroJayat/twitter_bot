const TB = require('./index.js')
test('Twitter Bot keys types', async () => {
    expect(typeof TB.CONSUMER_KEY).toBe('string')
    expect(typeof TB.CONSUMER_SECRET).toBe('string')
    expect(typeof TB.ACCESS_TOKEN).toBe('string')
    expect(typeof TB.ACCESS_TOKEN_SECRET).toBe('string')
});

test('Main methods are functions', () => {
    expect(typeof TB.getRetweets).toBe('function');
    expect(typeof TB.newTweet).toBe('function');
    expect(typeof TB.newTweetWithMedia).toBe('function');
    expect(typeof TB.destroyTweet).toBe('function');
    expect(typeof TB.unReTweet).toBe('function');
    expect(typeof TB.uploadMedia).toBe('function');
    expect(typeof TB.userTimeLine).toBe('function');
    expect(typeof TB.searchTweets).toBe('function');
    expect(typeof TB.error).toBe('function');
    expect(typeof TB.success).toBe('function');
    expect(typeof TB.mentionsTimeLine).toBe('function');
})

test('Promises are promises', () => {
})

