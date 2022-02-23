const https = require('https');
const qs = require('querystring');


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

module.exports = tokenCredentials