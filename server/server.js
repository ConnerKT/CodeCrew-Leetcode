const express = require("express");
const app = express();
const dotenv = require('dotenv').config();
const port = 3001;
const cors = require("cors");
const mongoose = require('mongoose');

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`Your server is available at http://localhost:${port}`);
});

mongoose.connect(process.env.mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to the MongoDB database");
});
