const express = require("express");
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const createClient = require("redis").createClient;
const redis = createClient(process.env.REDIS_URL);
const { createAdapter } = require("@socket.io/redis-adapter");
const { request } = require("https");
const subClient = redis.duplicate();
const router = require("./routes/problemRoutes")
const port = 3001;

redis.connect()
  .then(() => console.log('Redis Client Connected'))
  .catch('error', err => console.log('Redis Client Error', err))

const sessionSecret = "keyboard cat";
const redisStore = new RedisStore({ 
  client: redis,
  prefix: "sess:",
  ttl: 86400,
})
  
const sessionMiddleware = session({
  store: redisStore,
  resave: false,
  saveUninitialized: false,
  secret: sessionSecret,
  cookie: { secure: process.env.ENVIRONMENT == "PRODUCTION", httpOnly: false, sameSite: "lax", maxAge: 1000 * 60 * 60 * 24},
  unset: "destroy",
  maxAge: 1000 * 60 * 60 * 24,
  genid: (req) => {
    return req.body?.username;
  }
  
});
  
const app = express();
app.use(cors({
  origin: ["http://localhost:5500", "http://localhost:3000", "https://codecrew-leetcode.onrender.com"],
  credentials: true
}));

app.use(express.json());
app.use(function(req, res, next) {
  sessionMiddleware(req, res, next);
})

app.use(router)
const server = http.createServer(app);
const io = new Server(server, {
  adapter: createAdapter(redis, subClient),
  cors: {
    origin: ["http://localhost:5500", "http://localhost:3000", "https://codecrew-leetcode.onrender.com"],
    credentials: true
  }
});


app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.post("/login", async (req, res) => {
  const { username, gameroomId } = req.body;
  if (!username || !gameroomId) {
    return res.status(400).send("Username and room are required");
  }

  // Transaction that checks if the game room exists 
  const exists = await redis.exists(`gameroom:${gameroomId}`)
  if (!exists) {
    return res.status(404).send("Game room does not exist");
  }

  let userExists = await redis.json.arrIndex(`gameroom:${gameroomId}`, ".users", username)
                    .then((data)=>{return data != -1})

  // // Transaction that checks if the user is already in the game room
  if (userExists) {
    // check if there is a session in redis for the user
    let sessionExists = await redis.exists(`sess:${username}`)
    if (sessionExists) {
      return res.status(400).send("User already exists in the game room");
    }
  }else{
      // Add the user to the game room
      await redis.json.arrAppend(`gameroom:${gameroomId}`, ".users", username)
  }
    
  // Set session information for the user and their chosen room
  req.session.username = username;
  req.session.gameroomId = gameroomId;
  res.status(200).send(`User ${username} logged in and will join room ${gameroomId}`);
});

//change this to a a get endpoint because post requests generate new sessions for some reason
app.post("/logout", (req, res) => {

    if (req.session) {
      // Destroy the session
      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session:", err);
          return res.status(500).send("Internal server error");
        }
        // Optionally clear the client-side cookie if set
        // res.clearCookie('connect.sid'); // Adjust 'connect.sid' based on your cookie name
        redisStore.destroy(req.sessionID)
        res.status(200).send("Logged out successfully");
      });
    } else{
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
  const exists = await redis.exists(`gameroom:${gameroomId}`)
  if (exists) {
      return res.status(400).send("Game room already exists");
  }

  // Save the game room data to Redis
  await redis.json.set(`gameroom:${gameroomId}`, "$",gameRoomData);

  res.status(201).send(`Game room ${gameroomId} created with specified problems.`);
});




io.use((socket, next) => {
  const request = socket.request;
  sessionMiddleware(request, {}, () => {
    if (request.session?.username && request.session?.gameroomId) {
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

  let roomData = await redis.json.get(`gameroom:${room}`)

  socket.emit("sessionData", {user: socket.request.session, roomData: roomData})

});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


mongoose.connect(process.env.mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB database"))
  .catch(err => console.error("Could not connect to MongoDB:", err));
