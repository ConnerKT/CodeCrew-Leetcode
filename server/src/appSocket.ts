import appConfig from "./config/appConfig";
const { Server: SocketioServer } = require("socket.io");
import gameroomStore from "./stores/gameRoomStore";
import socketMiddleware from "./middleware/socketMiddleware";
import redisClient from "./config/redisConfig";
const appSocket = new SocketioServer({
    cors: {
        origin: appConfig.CORS_URLS,
        credentials: true
    }
});

appSocket.use(socketMiddleware);

let subscriber = redisClient.duplicate();
subscriber.connect()
.then(() => console.log("Sub connected to redis database"))
.catch(err => {
  console.error("Sub Could not connect to redis:", err)
  process.exit(1);
});

appSocket.on("connection", async (socket) => {
    const roomId = socket.request.session.gameroomId;
    console.log(`User ${socket.request.session.username} connected and joined room ${roomId}`);

    let roomData = await gameroomStore.getGameRoomData(roomId);
    console.log(roomData);
    socket.emit("sessionData", {user: socket.request.session, roomData: roomData});

    // Subscribe to the room's channel
    const channel = `channel:room:${roomId}`;
    subscriber.subscribe(channel, (err, count) => {
        if (err) {
            console.error(`Failed to subscribe to ${channel}`, err);
        } else {
            console.log(`Subscribed to ${channel}`);
        }
    });

    subscriber.on('message', (channel, message) => {
        if (channel === `channel:room:${roomId}`) {
            socket.emit('roomUpdate', JSON.parse(message));
        }
    });
});

export default appSocket;
