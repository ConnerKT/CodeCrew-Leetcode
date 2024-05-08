const gameRoomStore = require("../stores/gameRoomStore");

// endpoint for getting a room's data

exports.getGameRoomData = async (req, res) => {
    const { roomId } = req.query;
    try {
        const gameRoomData = await gameRoomStore.getGameRoomData(roomId);
        res.status(200).json(gameRoomData);
    } catch (error) {
        res.status(400).send(error.message);
    }
};



exports.createGameRoom = async (req, res) => {
    const { gameroomId, challenges } = req.body;
    
    if (!gameroomId) {
        return res.status(400).send("Game room ID is required");
    }
    
    if (!Array.isArray(challenges)) {
        return res.status(400).send("Problems must be an array");
    }

    try {
        const gameRoomData = { users: [], challenges: challenges }; // Renamed problems to challenges to match the store
        await gameRoomStore.createGameRoom(gameroomId, gameRoomData);
        res.status(201).send(`Game room ${gameroomId} created.`);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.login = async (req, res) => {
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
};

exports.logout = async (req, res) => {
    try {
        if (!req.session || !req.sessionID) {
            throw new Error("No session found");
        }

        // Make sure to pass the session ID correctly to the destroy session method.
        await gameRoomStore.destroySession(req.sessionID);

        // Destroy the Express session
        req.session.destroy((err) => {
            if (err) {
                throw new Error('Failed to destroy the session');
            }
            res.status(200).send("Logged out successfully");
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};