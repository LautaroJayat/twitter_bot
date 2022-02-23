const qs = require('querystring');
const { _makeRequest, URLencoder, readFile } = require('../utils/utils')

async function newTweet(status, twitterOptions) {
    let self = this;

    if (typeof status !== 'string') {
        self.error('Parameters werent provided in string format, instead got:', typeof status)
        return console.trace();
    }
    if (!status) {
        self.error('Missing query!')
        return console.trace();
    }
    if (twitterOptions && typeof twitterOptions !== 'object') {
        self.error('Options werent provided in object format, instead got:', typeof twitterOptions)
        return console.trace();
    }
    if (twitterOptions) {
        encodedOptions = qs.stringify(twitterOptions);
    }

    status = await URLencoder(status)

    await this._awaitToken()


    const request_data = {
        url: !twitterOptions ? `https://api.twitter.com/1.1/statuses/update.json?status=${status}` : `https://api.twitter.com/1.1/statuses/update.json?status=${status}&${encodedOptions}`,
        method: 'POST',
        data: !twitterOptions ? { status: status } : { status: status, ...twitterOptions }
    }

    const token = {
        key: self.ACCESS_TOKEN,
        secret: self.ACCESS_TOKEN_SECRET,
    }

    return await _makeRequest(
        self,
        'api.twitter.com',
        'POST',
        !twitterOptions
            ? `/1.1/statuses/update.json?status=${status}`
            : `/1.1/statuses/update.json?status=${status}&${encodedOptions}`,
        request_data,
        token
    )
}

async function reTweet(status, twitterOptions) {
    let self = this;

    if (typeof status !== 'string') {
        self.error('Parameters werent provided in string format, instead got:', typeof status)
        return console.trace();
    }
    if (!status) {
        self.error('Missing query!')
        return console.trace();
    }
    if (twitterOptions && typeof twitterOptions !== 'object') {
        self.error('Options werent provided in object format, instead got:', typeof twitterOptions)
        return console.trace();
    }
    if (twitterOptions) {
        encodedOptions = qs.stringify(twitterOptions);
    }

    status = await URLencoder(status)

    await this._awaitToken()


    const request_data = {
        url: !twitterOptions ? `https://api.twitter.com/1.1/statuses/retweet/${status}.json` : `https://api.twitter.com/1.1/statuses/retweet/${status}.json?${encodedOptions}`,
        method: 'POST',
        data: !twitterOptions ? {} : twitterOptions
    }

    const token = {
        key: self.ACCESS_TOKEN,
        secret: self.ACCESS_TOKEN_SECRET,
    }

    return await _makeRequest(
        self,
        'api.twitter.com',
        'POST',
        !twitterOptions
            ? `/1.1/statuses/retweet/${status}.json`
            : `/1.1/statuses/retweet/${status}.json?${encodedOptions}`,
        request_data,
        token
    )
}

async function destroyTweet(status, twitterOptions) {
    let self = this;

    if (typeof status !== 'string') {
        self.error('Parameters werent provided in string format, instead got:', typeof status)
        return console.trace();
    }
    if (!status) {
        self.error('Missing query!')
        return console.trace();
    }
    if (twitterOptions && typeof twitterOptions !== 'object') {
        self.error('Options werent provided in object format, instead got:', typeof twitterOptions)
        return console.trace();
    }
    if (twitterOptions) {
        encodedOptions = qs.stringify(twitterOptions);
    }

    status = await URLencoder(status)

    await this._awaitToken()


    const request_data = {
        url: !twitterOptions ? `https://api.twitter.com/1.1/statuses/destroy/${status}.json` : `https://api.twitter.com/1.1/statuses/destroy/${status}.json?${encodedOptions}`,
        method: 'POST',
        data: !twitterOptions ? {} : twitterOptions
    }

    const token = {
        key: self.ACCESS_TOKEN,
        secret: self.ACCESS_TOKEN_SECRET,
    }

    return await _makeRequest(
        self,
        'api.twitter.com',
        'POST',
        !twitterOptions
            ? `/1.1/statuses/destroy/${status}.json`
            : `/1.1/statuses/destroy/${status}.json?${encodedOptions}`,
        request_data,
        token
    )
}

async function unReTweet(status, twitterOptions) {
    let self = this;

    if (typeof status !== 'string') {
        self.error('Parameters werent provided in string format, instead got:', typeof status)
        return console.trace();
    }
    if (!status) {
        self.error('Missing query!')
        return console.trace();
    }
    if (twitterOptions && typeof twitterOptions !== 'object') {
        self.error('Options werent provided in object format, instead got:', typeof twitterOptions)
        return console.trace();
    }
    if (twitterOptions) {
        encodedOptions = qs.stringify(twitterOptions);
    }

    status = await URLencoder(status)

    await this._awaitToken()


    const request_data = {
        url: !twitterOptions ? `https://api.twitter.com/1.1/statuses/unretweet/${status}.json` : `https://api.twitter.com/1.1/statuses/unretweet/${status}.json?${encodedOptions}`,
        method: 'POST',
        data: !twitterOptions ? {} : twitterOptions
    }

    const token = {
        key: self.ACCESS_TOKEN,
        secret: self.ACCESS_TOKEN_SECRET,
    }

    return await _makeRequest(
        self,
        'api.twitter.com',
        'POST',
        !twitterOptions
            ? `/1.1/statuses/unretweet/${status}.json`
            : `/1.1/statuses/unretweet/${status}.json?${encodedOptions}`,
        request_data,
        token
    )
}

async function uploadMedia(file) {
    let self = this;

    if (!file) {
        self.error('You must provide a string with a file path!')
        return console.trace();
    }
    if (typeof file !== 'string') {
        self.error('You must provide a string with a file path! Instead got:', typeof file)
        return console.trace();
    }

    await this._awaitToken()


    let media = await readFile(file);

    const request_data = {
        url: `https://upload.twitter.com/1.1/media/upload.json`,
        method: 'POST',
        data: { media_data: media }
    }

    const token = {
        key: self.ACCESS_TOKEN,
        secret: self.ACCESS_TOKEN_SECRET,
    }

    return await _makeRequest(
        self,
        'upload.twitter.com',
        'POST',
        '/1.1/media/upload.json',
        request_data,
        token,
        media
    )
}

async function newTweetWithMedia(status, file, options) {
    let { media_id_string } = await this.uploadMedia(file)
    return this.newTweet(status, { media_ids: media_id_string, ...options })
}

async function shareMostRetweeted(query) {
    let tweets = await this.searchTweets(query);
    let max = 0;
    let index = 0;

    for (tweet of tweets.statuses) {
        if (tweet.retweet_count > max) {
            max = tweet.retweet_count
            index = tweets.statuses.indexOf(tweet);
        }
    }

    return this.reTweet(tweets.statuses[index].id_str)
}

async function shareMostRetweetedOf(options) {
    let tweets = await this.userTimeLine(options);
    let max = 0;
    let index = 0;
    for (tweet of tweets) {
        if (tweet.retweet_count > max && tweet.is_quoted_status === false && tweet.in_reply_to_status_id === null) {
            max = tweet.retweet_count;
            index = tweets.indexOf(tweet);
        }
    }

    this.reTweet(tweets[index].id_str);
    return
}

async function shareMostLiked(query) {
    let tweets = await this.searchTweets(query);
    let max = 0;
    let index = 0;
    for (tweet of tweets.statuses) {
        if (tweet.favorite_count > max) {
            max = tweet.favorite_count;
            index = tweets.statuses.indexOf(tweet);
        }
    }
    return this.reTweet(tweets.statuses[index].id_str)
}


async function shareMostLikedOf(options) {
    let tweets = await this.userTimeLine(options);
    let max = 0;
    let index = 0;
    for (tweet of tweets) {
        if (tweet.favorite_count > max && tweet.is_quoted_status === false && tweet.in_reply_to_status_id === null) {
            max = tweet.favorite_count;
            index = tweets.indexOf(tweet);
        }
    }

    this.reTweet(tweets[index].id_str);
    return
}


module.exports = {
    newTweet,
    destroyTweet,
    unReTweet,
    uploadMedia,
    newTweetWithMedia,
    newTweetWithMedia,
    shareMostRetweeted,
    shareMostRetweetedOf,
    shareMostLiked,
    shareMostLikedOf

}