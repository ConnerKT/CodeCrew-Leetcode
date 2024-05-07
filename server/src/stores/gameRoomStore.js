class GameRoomStore {
    constructor(redisClient) {
        this.redisClient = redisClient;
    }

    async gameRoomExists(gameroomId) {
        let result = await this.redisClient.exists(`gameroom:${gameroomId}`);
        return result
    }

    async createGameRoom(gameroomId, gameRoomData) {
        if (await this.gameRoomExists(gameroomId)) {
            throw new Error("Game room already exists");
        }
        await this.redisClient.json.set(`gameroom:${gameroomId}`, "$", gameRoomData);
    }

    async addUserToGameRoom(gameroomId, username) {
        const userExists = await this.redisClient.json.arrIndex(`gameroom:${gameroomId}`, ".users", username) !== -1;
        if (!userExists) {
            await this.redisClient.json.arrAppend(`gameroom:${gameroomId}`, ".users", username);
        }
    }
    async getGameRoomData(gameroomId) {
        console.log(gameroomId)
        return await this.redisClient.json.get(`gameroom:${gameroomId}`);
    }
    async checkUserSession(username) {
        return await this.redisClient.exists(`sess:${username}`);
    }

    async destroySession(sessionId) {
        await this.redisClient.del(`sess:${sessionId}`);
    }
}
const redis = require("../config/redisConfig");
const gameroomStore = new GameRoomStore(redis);

module.exports = gameroomStore
