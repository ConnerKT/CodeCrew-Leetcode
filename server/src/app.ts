const appConfig = require("./config/appConfig");
const express = require("express");
const cors = require("cors");
const problemsRouter =  require("./routes/problemRoutes")
import gameRoomRouter from "./routes/gameRoomRoutes"
import sessionMiddleware from "./middleware/sessionMiddleware"
const app = express();
app.use(cors({
  origin: appConfig.CORS_URLS,
  credentials: true
}));

app.use(express.json());
app.use(sessionMiddleware);
app.use(problemsRouter);
app.use(gameRoomRouter);

export default app;
