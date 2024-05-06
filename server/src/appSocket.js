const appConfig = require("./config/appConfig");
const { Server: SocketioServer } = require("socket.io");
const gameroomStore = require("./stores/gameRoomStore");
const socketMiddleware = require("./middleware/socketMiddleware");

const appSocket = new SocketioServer({
  cors: {
    origin: appConfig.CORS_URLS,
    credentials: true
  }
});


appSocket.use(socketMiddleware);
appSocket.on("connection", async (socket) => {
  const room = socket.request.session.gameroomId;
  console.log(`User ${socket.request.session.username} connected and joined room ${room}`);

  let roomData = await gameroomStore.getGameRoomData(`${room}`)
  console.log(roomData) 
  socket.emit("sessionData", {user: socket.request.session, roomData: roomData})

});


module.exports = appSocket;
