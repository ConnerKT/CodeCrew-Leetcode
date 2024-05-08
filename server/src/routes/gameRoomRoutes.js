const express = require('express');
const gameRoomRouter = express.Router();
const gameRoomController = require('../controllers/gameRoomController');

gameRoomRouter.post('/login', gameRoomController.login);
gameRoomRouter.post('/logout', gameRoomController.logout);
gameRoomRouter.post('/gameroom', gameRoomController.createGameRoom);
gameRoomRouter.get('/gameroom/:roomId', gameRoomController.getGameRoomData);
gameRoomRouter.get('/gameroom', gameRoomController.getAllGameRooms);

module.exports = gameRoomRouter;