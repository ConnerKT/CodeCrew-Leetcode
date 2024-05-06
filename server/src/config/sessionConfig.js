const session = require("express-session");
const RedisStore = require("connect-redis").default;
const redis = require("./redisConfig");

const sessionSecret = "keyboard cat";
const store = new RedisStore({
  client: redis,
  prefix: "sess:",
  ttl: 86400
});

const sessionMiddleware = session({
  store,
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.ENVIRONMENT === "PRODUCTION",
    httpOnly: false,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24
  }
});

module.exports = { sessionMiddleware };
