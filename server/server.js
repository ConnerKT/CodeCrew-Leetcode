const express = require("express");
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const problemRoutes = require('./routes/problemRoutes');
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const Redis = require("ioredis");
const redis = new Redis();
const cookie = require('cookie');
const signature = require('cookie-signature');
const port = 3001;

const app = express();
app.use(cors({
  origin: ["http://localhost:5500", "http://localhost:3000"],
  credentials: true
}));

app.use(express.json())  
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5500", "http://localhost:3000"],
    credentials: true
  }
});


const sessionSecret = "keyboard cat";
const sessionMiddleware = session({
  store: new RedisStore({ client: redis, prefix: "myapp:" }),
  resave: false,
  saveUninitialized: true,
  secret: sessionSecret,
  cookie: { secure: false, httpOnly: false, sameSite: "lax"},
});
const seed = require('./seedData');
const scrapeSeed = require('./scraperSeedData');

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(function(req, res, next) {

  if(req.path == "/"){
    return next()
  }

  if (req.body?.username != undefined || req.session != undefined) {
    sessionMiddleware(req, res, next);
  } 
  else {
    return next();
  }
});

function socketMiddleware(socket, next){
  const cookies = cookie.parse(socket.request.headers.cookie || '');
  let sessionId = cookies['connect.sid']; 
  sessionId = sessionId?.slice(2)
  if (!sessionId) {
    return next(new Error("No session available"));
  }
  sessionId = signature.unsign(sessionId, sessionSecret);

  redis.get(`myapp:${sessionId}`, (err, session) => {
    if (err || !session) {
      return next(new Error("Session not found"));
    }

    socket.request.session = {id: sessionId, ...JSON.parse(session)}; 

    return next();
  });
}
io.use(socketMiddleware);

app.use("/api", problemRoutes);


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


app.post("/login", sessionMiddleware, async (req, res) => {
  const { username, gameroomId } = req.body;

  if (!username || !gameroomId) {
      return res.status(400).send("Username and game room ID are required");
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

  // Set session information for the user
  req.session.username = username;
  req.session.gameroomId = gameroomId;

  res.status(200).send(`User ${username} joined game room ${gameroomId}`);
});

io.on("connection", (socket) => {
  console.log("Session1:", socket.request.session.id);

  console.log(`User ${socket.request.session.username} connected to ${socket.nsp.name}`);

  socket.on("message", (msg) => {
    console.log(
      `Message from user ${session.userId} in ${socket.nsp.name}: ${msg}`
    );
  });

  socket.on("get_session_data", () => {
    if (socket.request.session) {
      socket.emit("session_data", socket.request.session);
    } else {
      socket.emit("session_error", "Session data not found.");
    }
  });
  socket.emit("session_data", socket.request.session);
});


server.listen(port, () => {
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

// seed
// scrapeSeed
