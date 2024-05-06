const redis = require("../config/redisConfig");


exports.createGameRoom = async (req, res) => {
    const { gameroomId, problems } = req.body;
    
    if (!gameroomId) {
        return res.status(400).send("Game room ID is required");
    }
    
    if (!Array.isArray(problems)) {
        return res.status(400).send("Problems must be an array");
    }
    
    // Initialize game room with no users and a list of problems
    const gameRoomData = {
        users: [],  // Initialize with no users
        problems
    };
    
    // Check if the game room already exists
    const exists = await redis.exists(`gameroom:${gameroomId}`)
    if (exists) {
        return res.status(400).send("Game room already exists");
    }
    
    // Save the game room data to Redis
    await redis.json.set(`gameroom:${gameroomId}`, "$",gameRoomData);
    
    res.status(201).send(`Game room ${gameroomId} created.`);
}

exports.login = async (req, res) => {
    const { username, gameroomId } = req.body;
    if (username == null || gameroomId == null) {
      return res.status(400).send("Username and room are required");
    }
  
    // Transaction that checks if the game room exists 
    const exists = await redis.exists(`gameroom:${gameroomId}`)
    if (!exists) {
      return res.status(404).send("Game room does not exist");
    }
  
    let userExists = await redis.json.arrIndex(`gameroom:${gameroomId}`, ".users", username)
                      .then((data)=>{return data != -1})
  
    // // Transaction that checks if the user is already in the game room
    if (userExists) {
      // check if there is a session in redis for the user
      let sessionExists = await redis.exists(`sess:${username}`)
      if (sessionExists) {
        return res.status(400).send("User already exists in the game room");
      }
    }else{
        // Add the user to the game room
        await redis.json.arrAppend(`gameroom:${gameroomId}`, ".users", username)
    }
      
    // Set session information for the user and their chosen room
    req.session.username = username;
    req.session.gameroomId = gameroomId;
    res.status(200).send(`User ${username} logged in and will join room ${gameroomId}`);
}


exports.logout = async (req, res) => {

    if (req.session) {
        // Destroy the session
        req.session.destroy((err) => {
            if (err) {
            console.error("Error destroying session:", err);
            return res.status(500).send("Internal server error");
            }
            // Optionally clear the client-side cookie if set
            // res.clearCookie('connect.sid'); // Adjust 'connect.sid' based on your cookie name
            redisStore.destroy(req.sessionID)
            res.status(200).send("Logged out successfully");
        });
    } else{
        res.status(400).send("No session found");
    }
}