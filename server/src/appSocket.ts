import appConfig from "./config/appConfig";
import {Server as SocketioServer} from "socket.io";
import gameroomStore from "./stores/gameRoomStore";
import socketMiddleware from "./middleware/socketMiddleware";
import { UserSubmission } from "./models";
import Judge0Service  from "./services/judge0/judge0Service";


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
  
    // Join the room
    socket.join(roomId);
  
    let roomData = await gameroomStore.getGameRoomData(roomId);
    socket.emit("sessionData", { user: socket.request.session, roomData: roomData });
  
  
    socket.on("submission", async ({challenge, submission}) => {
      console.log(`Submission received from ${socket.request.session.username}`);
      console.log(submission);

      let formattedSubmission = Judge0Service.formatSubmissionPayload(challenge, submission);


      let response = await Judge0Service.createSubmission(formattedSubmission)
      console.log(response);
      appSocket.to(roomId).emit('newSubmission', submission);
    });
  

  
  
    // Handle disconnect
    socket.on('disconnect', () => {
      console.log(`User ${socket.request.session.username} disconnected from room ${roomId}`);
      // Leave the room
      socket.leave(roomId);
    });
});
  

appSocket.once("connection", async (socket: any) => {
    gameroomStore.subRedisClient.on('pmessage', async (pattern, channel, message) => {
        if(channel == "__keyevent@0__:set"){
            let roomId = message.split(":").pop();
            let roomData = await gameroomStore.getGameRoomData(roomId);
            appSocket.to(roomId).emit('roomUpdate', roomData);
        }
    });
})
  


  export default appSocket;