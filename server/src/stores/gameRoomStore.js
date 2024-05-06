class GameRoomStore {
    constructor(redisClient) {
        this.redis = redisClient;
    }

    async gameRoomExists(gameroomId) {
        return await this.redis.exists(`gameroom:${gameroomId}`);
    }

    async createGameRoom(gameroomId, gameRoomData) {
        if (await this.gameRoomExists(gameroomId)) {
            throw new Error("Game room already exists");
        }
        await this.redis.json.set(`gameroom:${gameroomId}`, "$", gameRoomData);
    }

    async addUserToGameRoom(gameroomId, username) {
        const userExists = await this.redis.json.arrIndex(`gameroom:${gameroomId}`, ".users", username) !== -1;
        if (!userExists) {
            await this.redis.json.arrAppend(`gameroom:${gameroomId}`, ".users", username);
        }
    }
    async getGameRoomData(gameroomId) {
        console.log(gameroomId)
        return await this.redis.json.get(`gameroom:${gameroomId}`);
    }
    async checkUserSession(username) {
        return await this.redis.exists(`sess:${username}`);
    }

    async destroySession(sessionId) {
        await this.redis.del(`sess:${sessionId}`);
    }
}
const redis = require("../config/redisConfig");
const gameroomStore = new GameRoomStore(redis);

module.exports = gameroomStore
