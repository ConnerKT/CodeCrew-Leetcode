const express = require('express');
const gameRoomRouter = express.Router();
import gameRoomStore from "../stores/gameRoomStore"

class User {
    username: string
    id: string
}

class UserSubmission {
    userId: string
    testCasesPassed: number
    submissionCode: string
    submissionLanguage: string
}

class Challenge {
    id: string
    testCases: number
    userSubmissions: UserSubmission[]
}

class GameRoom {
    id: string
    users: User[]
    challenges: Challenge[]
}
gameRoomRouter.post('/login', async (req, res) => {
    const { username, gameroomId } = req.body;
    
    try {
        if (!username || !gameroomId) {
            throw new Error("Username and room ID are required");
        }
        
        const exists = await gameRoomStore.gameRoomExists(gameroomId);
        if (!exists) {
            throw new Error("Game room does not exist");
        }

        await gameRoomStore.addUserToGameRoom(gameroomId, username);
        req.session.username = username;
        req.session.gameroomId = gameroomId;
        res.status(200).send(`User ${username} logged in and added to room ${gameroomId}`);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

gameRoomRouter.post('/logout', async (req, res) => {
    try {
        if (!req.session || !req.sessionID) {
            throw new Error("No session found");
        }

        // Make sure to pass the session ID correctly to the destroy session method.
        const gameRoomId = req.session.gameroomId;
        const username = req.session.username;
        // Destroy the Express session
        req.session.destroy((err) => {
            if (err) {
                throw new Error('Failed to destroy the session');
            }
            gameRoomStore.removeUserFromGameRoom(gameRoomId, username).then(() => {
                res.status(200).send("User logged out and removed from game room");
            });
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

gameRoomRouter.post('/gameroom', async (req, res) => {
    const gameRoomData: GameRoom = req.body;
    
    if (!gameRoomData.id) {
        return res.status(400).send("Game room ID is required");
    }
    
    if (!Array.isArray(gameRoomData.users)) {
        return res.status(400).send("Problems must be an array");
    }

    try {
    // Renamed problems to challenges to match the store
        await gameRoomStore.createGameRoom(gameRoomData);
        res.status(201).send(`Game room ${gameRoomData.id} created.`);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

gameRoomRouter.get('/gameroom/:roomId', async (req, res) => {
    const { roomId } = req.params;

    if (!roomId) {
        return res.status(400).send("Game room ID is required");
    }


    try {

        const exists = await gameRoomStore.gameRoomExists(roomId);
        if (!exists) {
            throw new Error("Game room does not exist");
        }
        
        const gameRoomData = await gameRoomStore.getGameRoomData(roomId);
        res.status(200).json(gameRoomData);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

gameRoomRouter.get('/gameroom', async (req, res) => {
    try {
        const gameRooms = await gameRoomStore.getAllGameRooms();
        res.status(200).json(gameRooms);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default gameRoomRouter
