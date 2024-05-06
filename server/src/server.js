const appConfig = require("./config/appConfig");

const http = require("http");
const app = require("./app");
const appSocket = require("./appSocket");
const redis = require("./config/redisConfig");
const mongo = require("./config/mongoConfig");

const httpServer = http.createServer(app);
appSocket.attach(httpServer);

//ensure that required environment variables are set using dotenv.config output



let port = appConfig.PORT;

httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
    mongo.connect(appConfig.MONGO_CONNECTION_STRING)
      .then(() => console.log("Connected to MongoDB database"))
      .catch(err => {
        console.error("Could not connect to MongoDB:", err)
        process.exit(1);
      });

    redis.connect()
      .then(() => console.log('Redis Client Connected'))
      .catch(err => {
        console.error('Redis Client Error', err)
        process.exit(1);
      });
});
