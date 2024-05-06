const { Server } = require("socket.io");
const { sessionMiddleware } = require("./config/sessionConfig");

function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5500", "http://localhost:3000", "https://codecrew-leetcode.onrender.com"],
      credentials: true
    }
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

  // Connection logic here
  return io;
}

module.exports = setupSocket;
