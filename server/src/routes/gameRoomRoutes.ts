import express, { Request, Response } from 'express';
import gameRoomStore from '../stores/gameRoomStore';
import { GameRoom, User } from '../models';
import { Express, Router } from 'express';
import session from 'express-session';


// Extend Express request to include session data
declare module 'express-session' {
    interface SessionData {
      username: string;
      gameroomId: string;
    }
  }
  
  declare module 'express-serve-static-core' {
    interface Request {
      session: session.Session & Partial<session.SessionData>;
    }
  }

const gameRoomRouter: Router = express.Router();

gameRoomRouter.post('/login', async (req: Request, res: Response) => {
    const { username, gameroomId } = req.body;

    try {
        if (!username || !gameroomId) {
            throw new Error("Username and room ID are required");
        }

        const exists = await gameRoomStore.gameRoomExists(gameroomId);
        if (!exists) {
            throw new Error("Game room does not exist");
        }
        let user: User = {username: username, id: req.sessionID};
        await gameRoomStore.addUserToGameRoom(gameroomId, user);
        req.session.username = username;
        req.session.gameroomId = gameroomId;
        
        //ensure Set-Cookie header is set
        res.header('Set-Cookie', `connect.sid=s%3A${req.sessionID}; Path=/; Expires=Mon, 20 May 2024 14:41:01 GMT; SameSite=None; Secure`
    );


        res.status(200).send(`User ${username} logged in and added to room ${gameroomId}`);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});

gameRoomRouter.post('/logout', async (req: Request, res: Response) => {
    try {
        if (!req.session || !req.sessionID) {
            throw new Error("No session found");
        }

        const gameRoomId = req.session.gameroomId;
        const username = req.session.username;


        if (!gameRoomId || !username) {
            throw new Error("No session data found");
        }

        req.session.destroy((err) => {
            if (err) {
                throw new Error('Failed to destroy the session');
            }

            gameRoomStore.removeUserFromGameRoom(gameRoomId, username).then(() => {

            }).catch((error) => {
                throw new Error(error.message);
            });
        });
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

gameRoomRouter.post('/gameroom', async (req: Request, res: Response) => {
    const {gameRoomId, challengeIds} = req.body as {gameRoomId: string, challengeIds: string[]};
    
    if (gameRoomId === undefined) {
        return res.status(400).send("gameRoomId is required");
    }

    if (challengeIds === undefined) {
        return res.status(400).send("challengeIds are required");
    }

    try {
        await gameRoomStore.createGameRoom(gameRoomId, challengeIds);
        res.status(201).send(`Game room ${gameRoomId} created.`);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});

gameRoomRouter.get('/gameroom/:roomId', async (req: Request, res: Response) => {
    const { roomId } = req.params;

    if (!roomId) {
        return res.status(400).send("Game room ID is required");
    }

    try {
        const exists = await gameRoomStore.gameRoomExists(roomId);
        if (!exists) {
            throw res.status(404).send("Game room does not exist");
        }

        const gameRoomData = await gameRoomStore.getGameRoomData(roomId);
        return res.status(200).json(gameRoomData);
    } catch (error: any) {
        console.log(error.message);
        res.status(400).send(error.message);
    }
});

gameRoomRouter.get('/gameroom', async (req: Request, res: Response) => {
    try {
        const gameRooms = await gameRoomStore.getAllGameRooms();
        res.status(200).json(gameRooms);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

export default gameRoomRouter;