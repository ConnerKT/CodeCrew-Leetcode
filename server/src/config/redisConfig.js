const appConfig = require("./appConfig");
const { createClient } = require("redis");
const redis = createClient(appConfig.REDIS_CONNECTION_STRING);


module.exports = redis;