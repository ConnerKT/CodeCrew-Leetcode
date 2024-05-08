const appConfig = require("./config/appConfig");

const http = require("http");
const app = require("./app");
const appSocket = require("./appSocket");
const redis = require("./config/redisConfig");
const mongo = require("./config/mongoConfig");

const httpServer = http.createServer(app);
appSocket.attach(httpServer);




let port = appConfig.PORT;

httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
    mongo.connect()
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
