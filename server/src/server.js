const http = require("http");
const app = require("./app");
const setupSocket = require("./socketConfig");
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3001;

const server = http.createServer(app);
setupSocket(server);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  mongoose.connect(process.env.mongoDBUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log("Connected to MongoDB database"))
    .catch(err => console.error("Could not connect to MongoDB:", err));
});
