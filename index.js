// requiring neccessary modueles
// requiring neccessary modueles
const Oauth = require('oauth-1.0a');
const qs = require('querystring');
const crypto = require('crypto');
const fs = require('fs');
const { tokenCredentials } = require('./utils/utils')
const logger = require('./logger')
const getMethods = requre('./requests/getMethods')
const postMethods = requre('./requests/postMethods')


// Make A config Object
const makeConfigs = (configs) => {
    return {
        CONSUMER_KEY: configs.CONSUMER_KEY || process.env.CONSUMER_KEY,
        CONSUMER_SECRET: configs.CONSUMER_SECRET || process.env.CONSUMER_SECRET,
        ACCESS_TOKEN: configs.ACCESS_TOKEN || process.env.ACCESS_TOKEN,
        ACCESS_TOKEN_SECRET: configs.ACCESS_TOKEN_SECRET || process.env.ACCESS_TOKEN_SECRET,
    }
}

// Twitter Bot Constructor
function Twitter_Bot(configs) {
    if (!(this instanceof Twitter_Bot)) {
        return new Twitter_Bot(configs)
    }
    this.CONSUMER_KEY = configs.CONSUMER_KEY;
    this.CONSUMER_SECRET = configs.CONSUMER_SECRET;
    this.ACCESS_TOKEN = configs.ACCESS_TOKEN;
    this.ACCESS_TOKEN_SECRET = configs.ACCESS_TOKEN_SECRET;
    this.oauth = new Oauth({
        consumer: { key: configs.CONSUMER_KEY, secret: congigs.CONSUMER_SECRET },
        signature_method: 'HMAC-SHA1',
        hash_function(base_string, key) {
            return crypto
                .createHmac('sha1', key)
                .update(base_string)
                .digest('base64')
        }
    })
    this.success('Twitter Bot was created successfully');
}

// Twiter initializator
Twitter_Bot.prototype.init = async function () {
    if (!this.token) {
        this.token = await tokenCredentials;
        // Preventing someone from modifying our keys
        Object.freeze(TB);
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


Object.assign(Twitter_Bot.prorotype, logger)
Object.assign(Twitter_Bot.prorotype, getMethods)
Object.assign(Twitter_Bot.prorotype, postMethods)

module.exports = { Twitter_Bot, makeConfigs };
