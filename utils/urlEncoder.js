async function URLencoder(object) {
    object = encodeURIComponent(object);
    object = await object.replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
    return object
}

module.exports = URLencoder