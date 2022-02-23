// A promise to read files (use carefully, this isn't a stram)
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

module.exports = readFile