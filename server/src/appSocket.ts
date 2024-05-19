import appConfig from "./config/appConfig"
const { Server: SocketioServer } = require("socket.io");
import gameroomStore from "./stores/gameRoomStore";
import socketMiddleware from "./middleware/socketMiddleware"

const appSocket = new SocketioServer({
  cors: {
    origin: appConfig.CORS_URLS,
    credentials: true
  }
});


appSocket.use(socketMiddleware);
appSocket.on("connection", async (socket) => {
  const roomId = socket.request.session.gameroomId;
  console.log(`User ${socket.request.session.username} connected and joined room ${roomId}`);

  let roomData = await gameroomStore.getGameRoomData(roomId)
  console.log(roomData) 
  socket.emit("sessionData", {user: socket.request.session, roomData: roomData})

});


export default appSocket;