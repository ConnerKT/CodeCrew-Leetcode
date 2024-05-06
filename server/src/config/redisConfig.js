const { createClient } = require("redis");
const redis = createClient(process.env.REDIS_URL);
// redis.connect()
// .then(() => console.log('Redis Client Connected'))
// .catch(err => console.error('Redis Client Error', err));

module.exports = redis 
