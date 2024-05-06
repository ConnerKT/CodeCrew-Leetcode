const gameRoomStore = require("../stores/gameRoomStore");

exports.createGameRoom = async (req, res) => {
    const { gameroomId, problems } = req.body;
    
    if (!gameroomId) {
        return res.status(400).send("Game room ID is required");
    }
    
    if (!Array.isArray(problems)) {
        return res.status(400).send("Problems must be an array");
    }

    try {
        const gameRoomData = { users: [], problems };
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
            throw new Error("Username and room are required");
        }
        
        const exists = await gameRoomStore.gameRoomExists(gameroomId);
        if (!exists) {
            throw new Error("Game room does not exist");
        }

        await gameRoomStore.addUserToGameRoom(gameroomId, username);

        req.session.username = username;
        req.session.gameroomId = gameroomId;
        res.status(200).send(`User ${username} logged in and will join room ${gameroomId}`);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.logout = async (req, res) => {
    try {
        if (!req.session) {
            throw new Error("No session found");
        }

        await gameRoomStore.destroySession(req.sessionID);
        req.session.destroy();
        res.status(200).send("Logged out successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
};
