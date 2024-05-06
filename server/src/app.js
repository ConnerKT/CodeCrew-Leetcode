const express = require("express");
const cors = require("cors");
const session = require("express-session");
const { sessionMiddleware } = require("./config/sessionConfig");
const problemsRouter = require("./routes/problemRoutes");
const gameRoomRouter = require("./routes/gameRoomRoutes");
const app = express();
app.use(cors({
  origin: ["http://localhost:5500", "http://localhost:3000", "https://codecrew-leetcode.onrender.com"],
  credentials: true
}));

app.use(express.json());
app.use(sessionMiddleware);
app.use(problemsRouter);
app.use(gameRoomRouter);

module.exports = app;
