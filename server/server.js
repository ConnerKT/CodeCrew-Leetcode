const express = require("express");
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS);
const { createAdapter } = require("@socket.io/redis-adapter");
const { request } = require("https");
const subClient = redis.duplicate();
const router = require("./routes/problemRoutes")
const port = 3001;

const app = express();
app.use(cors({
  origin: ["http://localhost:5500", "http://localhost:3000", "https://codecrew-leetcode.onrender.com"],
  credentials: true
}));

app.use(express.json());
app.use(router)
const server = http.createServer(app);
const io = new Server(server, {
  adapter: createAdapter(redis, subClient),
  cors: {
    origin: ["http://localhost:5500", "http://localhost:3000", "https://codecrew-leetcode.onrender.com"],
    credentials: true
  }
});

const sessionSecret = "keyboard cat";
const redisStore = new RedisStore({ client: redis, prefix: "myapp:" })
const sessionMiddleware = session({
  // store: redisStore,
  resave: false,
  saveUninitialized: false,
  secret: sessionSecret,
  cookie: { secure: process.env.ENVIRONMENT == "PRODUCTION", httpOnly: false, sameSite: "lax"},
  unset: "destroy"
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(sessionMiddleware);

app.post("/login", async (req, res) => {
  const { username, gameroomId } = req.body;
  if (!username || !gameroomId) {
    return res.status(400).send("Username and room are required");
  }

  // Retrieve the game room from Redis
  const gameRoomDataString = await redis.get(`gameroom:${gameroomId}`);
  if (!gameRoomDataString) {
      return res.status(404).send("Game room not found");
  }

  // Parse the game room data
  const gameRoomData = JSON.parse(gameRoomDataString);

  // Add the user to the game room's list of users, avoiding duplicates
  if (!gameRoomData.users.includes(username)) {
      gameRoomData.users.push(username);

      // Save the updated game room data back to Redis
      await redis.set(`gameroom:${gameroomId}`, JSON.stringify(gameRoomData));
  }
  // Set session information for the user and their chosen room
  req.session.username = username;
  req.session.gameroomId = gameroomId;
  res.status(200).send(`User ${username} logged in and will join room ${gameroomId}`);
});

app.post("/logout", async (req, res) => {
  if (req.session) {
    req.cookies
    req.session.cookie
    req.headers.cookie
    // redisStore.destroy(req.session.id)

    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).send("Internal server error");
      }
      // Optionally clear the client-side cookie if set
      res.clearCookie('connect.sid'); // Adjust 'connect.sid' based on your cookie name
      res.status(200).send("Logged out successfully");
    });
  } else {
    // No session found, possibly already logged out or never logged in
    res.status(400).send("No session found");
  }
});


//api endpoint for creating a game room
app.post("/gameroom", async (req, res) => {
  const { gameroomId, problems } = req.body;

  if (!gameroomId) {
      return res.status(400).send("Game room ID is required");
  }

  if (!Array.isArray(problems)) {
      return res.status(400).send("Problems must be an array");
  }

  // Initialize game room with no users and a list of problems
  const gameRoomData = {
      users: [],  // Initialize with no users
      problems
  };

  // Check if the game room already exists
  const exists = await redis.get(`gameroom:${gameroomId}`);
  if (exists) {
      return res.status(400).send("Game room already exists");
  }

  // Save the game room data to Redis
  await redis.set(`gameroom:${gameroomId}`, JSON.stringify(gameRoomData));

  res.status(201).send(`Game room ${gameroomId} created with specified problems.`);
});




io.use((socket, next) => {
  const request = socket.request;
  sessionMiddleware(request, {}, () => {
    if (request.session.username && request.session.gameroomId) {
      next();
    } else {
      next(new Error("Authentication error"));
    }
  });
});

io.on("connection", async (socket) => {
  // Automatically join the user to the room stored in their session
  const room = socket.request.session.gameroomId;
  console.log(`User ${socket.request.session.username} connected and joined room ${room}`);



  socket.emit("sessionData", socket.request.session)

  let roomData = await redis.get(`gameroom:${room}`)
  socket.emit("roomData", JSON.parse(roomData))
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


mongoose.connect(process.env.mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB database"))
  .catch(err => console.error("Could not connect to MongoDB:", err));
