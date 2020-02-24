// requiring neccessary modueles
// requiring neccessary modueles
const Oauth = require('oauth-1.0a');
require('dotenv').config();
const https = require('https');
const qs = require('querystring');
const crypto = require('crypto');
const fs = require('fs');

const oauth = new Oauth({
    consumer: { key: process.env.CONSUMER_KEY, secret: process.env.CONSUMER_SECRET },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
        return crypto
            .createHmac('sha1', key)
            .update(base_string)
            .digest('base64')
    }
})

async function URLencoder(object) {
    object = encodeURIComponent(object);
    object = await object.replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
    return object
}

// Set Colors
let Reset = "\x1b[0m"
let FgGreen = "\x1b[32m"
let FgYellow = "\x1b[33m"
let BgRed = "\x1b[41m"

// Make A config Objects
var configs = {
    CONSUMER_KEY: process.env.CONSUMER_KEY,
    CONSUMER_SECRET: process.env.CONSUMER_SECRET,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
}

// Twitter Bot Constructor
function Twitter_Bot(configs) {
    if (!(this instanceof Twitter_Bot)) { return new Twitter_Bot(configs) }
    this.CONSUMER_KEY = configs.CONSUMER_KEY;
    this.CONSUMER_SECRET = configs.CONSUMER_SECRET;
    this.ACCESS_TOKEN = configs.ACCESS_TOKEN;
    this.ACCESS_TOKEN_SECRET = configs.ACCESS_TOKEN_SECRET;
    this.success('Twitter Bot was created successfully');
}

// Promise helper to retrive OAuth bearrer token
const tokenCredentials = new Promise((resolve, reject) => {

    let credentials = Buffer.from(configs.CONSUMER_KEY + ':' + configs.CONSUMER_SECRET).toString('base64');


    const opts = {
        method: 'POST',
        hostname: 'api.twitter.com',
        port: 443,
        path: '/oauth2/token',
        headers: {
            'Authorization': 'Basic ' + credentials,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'

        },
        json: true,
    }


    const req = https.request(opts, (res) => {
        let data = [];
        //console.log('statusCode:', res.statusCode);
        //console.log('headers:', res.headers);

        res.on('data', (chunk) => {
            data.push(chunk)

        });
        res.on('end', () => {
            resolve(JSON.parse(
                Buffer.concat(data)
                    .toString()
            ))
        })
    });

    req.on('error', (e) => {
        reject(e);
    });
    const BODY = qs.stringify({ 'grant_type': 'client_credentials' });
    req.write(BODY)
    req.end();
})

// Custom error message
Twitter_Bot.prototype.error = function (string, object) {
    console.error('\n', FgYellow, string, Reset, BgRed, object, Reset);
}

// Custom success message
Twitter_Bot.prototype.success = function (string) {
    console.log(FgGreen, string, Reset, '\n')
}

// Twiter initializator
Twitter_Bot.prototype.init = async function () {
    if (!this.token) {
        this.token = await tokenCredentials;
        return this.success('Access tokens were retrived from server and stored in memory')
    } else {
        this.success('Access tokens are allready stored in memory')
        return
    }
}

// A little helper to run before every function
// to ensure that we have the neccessary tokens
Twitter_Bot.prototype._awaitToken = async function () {
    if (!this.token || this.token.errors) { await tokenCredentials }
}

//
// Get methods
//

// Search Twits methods
Twitter_Bot.prototype.searchTweets = async function (query) {
    await this._awaitToken()
    let self = this;

    return new Promise(function (resolve, reject) {
        if (typeof query !== 'object') {
            self.error('Parameters werent provided in object format, instead got:', typeof query)
            return console.trace();
        }
        if (!query.q) {
            self.error('Missing query in the following object provided:', query)
            return console.trace();
        }


        const options = {
            hostname: 'api.twitter.com',
            port: 443,
            path: '/1.1/search/tweets.json?' + qs.stringify(query),
            method: 'GET',
            headers: {
                'authorization': self.token.token_type + " " + self.token.access_token,

            }
        };

        const req = https.request(options, (res) => {
            //console.log('statusCode:', res.statusCode);
            //console.log('headers:', res.headers);
            let data = [];
            res.on('data', (chunk) => {
                data.push(chunk)
            });
            res.on('end', () => {
                resolve(JSON.parse(Buffer.concat(data).toString()))
            })
        });

        req.on('error', (e) => {
            reject(e);
        });

        req.end();
    })

}

// Get twit by ID
Twitter_Bot.prototype.getTweet = async function (query) {
    await this._awaitToken()
    let self = this;

    return new Promise(function (resolve, reject) {
        if (typeof query !== 'string') {
            self.error('Parameters werent provided in string format, instead got:', query)
            return console.trace();
        }
        if (!query) {
            self.error('Missing query!')
            return console.trace();
        }


        const options = {
            hostname: 'api.twitter.com',
            port: 443,
            path: '/1.1/statuses/show.json?' + qs.stringify({ id: query }),
            method: 'GET',
            headers: {
                'authorization': self.token.token_type + " " + self.token.access_token,

            }
        };

        const req = https.request(options, (res) => {
            //console.log('statusCode:', res.statusCode);
            //console.log('headers:', res.headers);
            let data = [];
            res.on('data', (chunk) => {
                data.push(chunk)
            });
            res.on('end', () => {
                resolve(JSON.parse(Buffer.concat(data).toString()))
            })
        });

        req.on('error', (e) => {
            reject(e);
        });

        req.end();
    })

}

// Get retweetes from one tweet
Twitter_Bot.prototype.getRetweets = async function (query, params) {
    await this._awaitToken()
    let self = this;

    return new Promise(function (resolve, reject) {
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


        const options = {
            hostname: 'api.twitter.com',
            port: 443,
            path: params ? `/1.1/statuses/retweets/${query}.json?${params}` : `/1.1/statuses/retweets/${query}.json`,
            method: 'GET',
            headers: {
                'authorization': self.token.token_type + " " + self.token.access_token,

            }
        };

        const req = https.request(options, (res) => {
            //console.log('statusCode:', res.statusCode);
            //console.log('headers:', res.headers);
            let data = [];
            res.on('data', (chunk) => {
                data.push(chunk)
            });
            res.on('end', () => {
                resolve(JSON.parse(Buffer.concat(data).toString('utf8')))
            })
        });

        req.on('error', (e) => {
            reject(e);
        });

        req.end();
    })

}




//
//  POSTS
//

// Post new tweet
Twitter_Bot.prototype.newTweet = async function (status, twitterOptions) {
    await this._awaitToken()
    let self = this;
    console.log(twitterOptions)
    return new Promise(async function (resolve, reject) {
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
        console.log(status)

        const request_data = {
            url: !twitterOptions ? `https://api.twitter.com/1.1/statuses/update.json?status=${status}` : `https://api.twitter.com/1.1/statuses/update.json?status=${status}&${encodedOptions}`,
            method: 'POST',
            data: !twitterOptions ? { status: status } : { status: status, ...twitterOptions }
        }
        const token = {
            key: self.ACCESS_TOKEN,
            secret: self.ACCESS_TOKEN_SECRET,
        }


        console.log(oauth.toHeader(oauth.authorize(request_data, token)))

        const options = {
            hostname: 'api.twitter.com',
            port: 443,
            path: !twitterOptions ? `/1.1/statuses/update.json?status=${status}` : `/1.1/statuses/update.json?status=${status}&${encodedOptions}`,
            method: 'POST',
            headers: oauth.toHeader(oauth.authorize(request_data, token))
        };

        const req = https.request(options, (res) => {
            console.log('statusCode:', res.statusCode);
            //console.log('headers:', res.headers);
            let data = [];
            res.on('data', (chunk) => {
                data.push(chunk)
            });
            res.on('end', () => {
                resolve(JSON.parse(Buffer.concat(data).toString()))
                console.log('end', self.status)
            })
        });

        req.on('error', (e) => {
            reject(e);
        });

        req.end();
    })


}

// A promise to read files
async function readFile(file) {
    return new Promise(function (resolve, reject) {
        fs.readFile(file, { encoding: 'base64' }, (err, data) => {
            if (err) {
                reject(err)
            }
            resolve(data)
        })
    })
}

// A function to upload images and retrive media
Twitter_Bot.prototype.uploadMedia = async function (file) {
    await this._awaitToken()
    let self = this;
    let media = await readFile(file);

    return new Promise(async function (resolve, reject) {

        const request_data = {
            url: `https://upload.twitter.com/1.1/media/upload.json`,
            method: 'POST',
            data: { media_data: media }
        }
        const token = {
            key: self.ACCESS_TOKEN,
            secret: self.ACCESS_TOKEN_SECRET,
        }


        console.log(oauth.toHeader(oauth.authorize(request_data, token)))

        const options = {
            hostname: 'upload.twitter.com',
            port: 443,
            path: '/1.1/media/upload.json',
            method: 'POST',
            headers: oauth.toHeader(oauth.authorize(request_data, token))
        };

        const req = https.request(options, (res) => {
            console.log('statusCode:', res.statusCode);
            //console.log('headers:', res.headers);
            let data = [];
            res.on('data', (chunk) => {
                data.push(chunk)
            });
            res.on('end', () => {
                resolve(JSON.parse(Buffer.concat(data).toString()))
                console.log('end')
            })
        });

        req.on('error', (e) => {
            reject(e);
        });
        req.setHeader('Content-Type', 'application/x-www-form-urlencoded')
        req.write(qs.stringify({ media_data: media }))
        req.end()

    })


}

// A function to 
Twitter_Bot.prototype.newTweetWithMedia = async function (status, file, options) {
    let { media_id_string } = await this.uploadMedia(file)
    return this.newTweet(status, { media_ids: media_id_string, ...options })
}





let TB = new Twitter_Bot(configs);
TB.init();
module.exports = TB;
