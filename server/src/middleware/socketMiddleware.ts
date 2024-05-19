import sessionMiddleware from "./sessionMiddleware"


const socketMiddleware = (socket, next) => {
    const request = socket.request;
    sessionMiddleware(request, {}, () => {
      if (request.session?.username && request.session?.gameroomId) {
        next();
      } else {
        next(new Error("Authentication error"));
      }
    });
  }

export default socketMiddleware 