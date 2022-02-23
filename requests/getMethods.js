async function searchTweets(query) {
    let self = this;

    if (typeof query !== 'object') {
        self.error('Parameters werent provided in object format, instead got:', typeof query)
        return console.trace();
    }
    if (!query.q) {
        self.error('Missing query in the following object provided:', query)
        return console.trace();
    }

    await this._awaitToken()



    return await _makeRequest(
        self,
        'api.twitter.com',
        'GET',
        '/1.1/search/tweets.json?' + qs.stringify(query)
    )

}

async function getTweet(query) {
    let self = this;

    if (typeof query !== 'string') {
        self.error('Parameters werent provided in string format, instead got:', query)
        return console.trace();
    }
    if (!query) {
        self.error('Missing query!')
        return console.trace();
    }

    await this._awaitToken()


    return await _makeRequest(
        self,
        'api.twitter.com',
        'GET',
        '/1.1/statuses/show.json?' + qs.stringify({ id: query })
    )
}

async function getRetweets(query, params) {
    let self = this;

    if (typeof query !== 'string') {
        self.error('Parameters werent provided in string format, instead got:', typeof query)
        return console.trace();
    }
    if (!query) {
        self.error('Missing query!')
        return console.trace();
    }
    if (params && typeof params !== 'object') {
        self.error('Type error, expected object as second argument but instead got', params)
        return console.trace();
    }
    if (params) {
        params = qs.stringify(params)
    }

    await this._awaitToken()


    return await _makeRequest(
        self,
        'api.twitter.com',
        'GET',
        params
            ? `/1.1/statuses/retweets/${query}.json?${params}`
            : `/1.1/statuses/retweets/${query}.json`,

    )

}

async function userTimeLine(query) {
    let self = this;

    if (typeof query !== 'object') {
        self.error('Parameters werent provided in object format, instead got:', typeof query)
        return console.trace();
    }

    await this._awaitToken()



    return await _makeRequest(
        self,
        'api.twitter.com',
        'GET',
        '/1.1/statuses/user_timeline.json?' + qs.stringify(query)
    )

}

async function mentionsTimeLine(query) {
    let self = this;

    if (query && typeof query !== 'object') {
        self.error('Parameters werent provided in object format, instead got:', typeof query)
        return console.trace();
    }

    await this._awaitToken()

    let _query = qs.stringify(query);

    const request_data = {
        url: !query
            ? `https://api.twitter.com/1.1/statuses/mentions_timeline.json`
            : `https://api.twitter.com/1.1/statuses/mentions_timeline.json?${_query}`,
        method: 'GET',
        data: query
    }

    const token = {
        key: self.ACCESS_TOKEN,
        secret: self.ACCESS_TOKEN_SECRET,
    }


    return await _makeRequest(
        self,
        'api.twitter.com',
        'GET',
        !query
            ? `/1.1/statuses/mentions_timeline.json`
            : `/1.1/statuses/mentions_timeline.json?${_query}`,
        request_data,
        token

    )

}

async function reTweetOfMe(query) {
    let self = this;

    if (query && typeof query !== 'object') {
        self.error('Parameters werent provided in object format, instead got:', typeof query)
        return console.trace();
    }

    await this._awaitToken()

    let _query = qs.stringify(query);

    const request_data = {
        url: !query
            ? `https://api.twitter.com/1.1/statuses/retweets_of_me.json`
            : `https://api.twitter.com/1.1/statuses/retweets_of_me.json?${_query}`,
        method: 'GET',
        data: query
    }

    const token = {
        key: self.ACCESS_TOKEN,
        secret: self.ACCESS_TOKEN_SECRET,
    }


    return await _makeRequest(
        self,
        'api.twitter.com',
        'GET',
        !query
            ? `/1.1/statuses/retweets_of_me.json`
            : `/1.1/statuses/retweets_of_me.json?${_query}`,
        request_data,
        token

    )

}

async function reTweetersIds(query) {
    let self = this;

    if (typeof query !== 'object') {
        self.error('Parameters werent provided in object format, instead got:', typeof query)
        return console.trace();
    }

    if (!query.id) {
        self.error('Must provide id in the query!')
        return console.trace();
    }

    await this._awaitToken()

    let _query = qs.stringify(query);

    const request_data = {
        url: `https://api.twitter.com/1.1/statuses/retweeters/ids.json?${_query}`,
        method: 'GET',
        data: query
    }

    const token = {
        key: self.ACCESS_TOKEN,
        secret: self.ACCESS_TOKEN_SECRET,
    }


    return await _makeRequest(
        self,
        'api.twitter.com',
        'GET',
        `/1.1/statuses/retweeters/ids.json?${_query}`,
        request_data,
        token

    )

}

module.exports = {
    searchTweets,
    getTweet,
    getRetweets,
    userTimeLine,
    mentionsTimeLine,
    reTweetOfMe,
    reTweetersIds
}