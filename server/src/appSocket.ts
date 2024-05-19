import appConfig from "./config/appConfig";
const { Server: SocketioServer } = require("socket.io");
import gameroomStore from "./stores/gameRoomStore";
import socketMiddleware from "./middleware/socketMiddleware";
import { UserSubmission } from "./models";


const appSocket = new SocketioServer({
    cors: {
        origin: appConfig.CORS_URLS,
        credentials: true
    }
});

appSocket.use(socketMiddleware);





appSocket.on("connection", async (socket: any) => {
    const roomId = socket.request.session.gameroomId;
    console.log(`User ${socket.request.session.username} connected and joined room ${roomId}`);

    let roomData = await gameroomStore.getGameRoomData(roomId);
    socket.emit("sessionData", {user: socket.request.session, roomData: roomData});


    socket.on("submission", async (submission: UserSubmission) => {
        console.log(`Submission received from ${socket.request.session.username}`);
        console.log(submission);
    })
    
    gameroomStore.subRedisClient.subscribe(`channel:room:${roomId}`);
    gameroomStore.subRedisClient.on('message', (channel, message) => {
        if (channel === `channel:room:${roomId}`) {
            socket.emit('roomUpdate', JSON.parse(message));
        }
    });


});

export default appSocket;
