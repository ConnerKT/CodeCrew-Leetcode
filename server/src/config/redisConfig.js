const appConfig = require("./appConfig");
const redis = require("redis");
const redisClient = redis.createClient(appConfig.REDIS_CONNECTION_STRING);

module.exports = redisClient;