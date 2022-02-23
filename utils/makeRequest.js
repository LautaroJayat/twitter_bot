const https = require('https');
const qs = require('querystring');


async function _makeRequest(self, host, method, path, request_data, token, media) {
    return new Promise(function (resolve, reject) {
        const options = {
            hostname: host,
            port: 443,
            path: path,
            method: method,
            headers:
                !request_data
                    ? { 'authorization': self.token.token_type + " " + self.token.access_token }
                    : self.oauth.toHeader(self.oauth.authorize(request_data, token))
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

        if (host === 'upload.twitter.com') {
            req.setHeader('Content-Type', 'application/x-www-form-urlencoded');
            req.write(qs.stringify({ media_data: media }))
        }
        req.end();
    })
}

module.exports = _makeRequest