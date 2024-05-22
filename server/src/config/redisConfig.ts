// Import the application configuration and the ioredis module
import appConfig from "./appConfig";
import Redis from "ioredis";

// Create a new Redis client using the connection string from the application configuration
const redisClient = new Redis(appConfig.REDIS_CONNECTION_STRING, {lazyConnect: true});

// Export the Redis client for use in other parts of the application
export default redisClient;
