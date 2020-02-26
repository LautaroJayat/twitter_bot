const Twitter_bot = require('./index')


test('Twitter Bot keys types', async () => {
    expect(typeof Twitter_bot.CONSUMER_KEY).toBe('string')
    expect(typeof Twitter_bot.CONSUMER_SECRET).toBe('string')
    expect(typeof Twitter_bot.ACCESS_TOKEN).toBe('string')
    expect(typeof Twitter_bot.ACCESS_TOKEN_SECRET).toBe('string')
});

test('Main methods are functions', () => {
    expect(typeof Twitter_bot.getRetweets).toBe('function');
    expect(typeof Twitter_bot.newTweet).toBe('function');
    expect(typeof Twitter_bot.newTweetWithMedia).toBe('function');
    expect(typeof Twitter_bot.destroyTweet).toBe('function');
    expect(typeof Twitter_bot.unReTweet).toBe('function');
    expect(typeof Twitter_bot.uploadMedia).toBe('function');
    expect(typeof Twitter_bot.userTimeLine).toBe('function');
    expect(typeof Twitter_bot.searchTweets).toBe('function');
    expect(typeof Twitter_bot.error).toBe('function');
    expect(typeof Twitter_bot.success).toBe('function');
    expect(typeof Twitter_bot.mentionsTimeLine).toBe('function');
})

test('Promises are promises', () => {
})

