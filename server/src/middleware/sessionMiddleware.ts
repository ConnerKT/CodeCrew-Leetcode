import appConfig from "../config/appConfig"
const session = require("express-session");
const RedisStore = require("connect-redis").default;
import redis from "../config/redisConfig"

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
    secure: appConfig.ENVIRONMENT === "PRODUCTION",
    httpOnly: false,
    sameSite: appConfig.ENVIRONMENT === "PRODUCTION" ? "none" : "lax",
  }
});

export default sessionMiddleware;