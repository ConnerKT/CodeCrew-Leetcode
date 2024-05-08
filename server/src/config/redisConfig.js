// Import the application configuration and the ioredis module
const appConfig = require("./appConfig");
const Redis = require("ioredis");

// Create a new Redis client using the connection string from the application configuration
const redisClient = new Redis(appConfig.REDIS_CONNECTION_STRING, {lazyConnect: true});

// Export the Redis client for use in other parts of the application
module.exports = redisClient;
