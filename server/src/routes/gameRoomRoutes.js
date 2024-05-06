const express = require('express');
const gameRoomRouter = express.Router();
const gameRoomController = require('../controllers/gameRoomController');

gameRoomRouter.post('/login', gameRoomController.login);
gameRoomRouter.post('/logout', gameRoomController.logout);
gameRoomRouter.post('/gameroom', gameRoomController.createGameRoom);

module.exports = gameRoomRouter;