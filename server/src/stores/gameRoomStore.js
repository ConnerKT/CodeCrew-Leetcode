const redisClient = require("../config/redisConfig");

class GameRoomStore {
    constructor(redisClient) {
        this.redisClient = redisClient;
    }

    async gameRoomExists(gameroomId) {
        return await this.redisClient.exists(`${gameroomId}`);
    }

    async createGameRoom(gameroomId, gameRoomData) {
        if (await this.gameRoomExists(gameroomId)) {
            throw new Error("Game room already exists");
        }
        // Use a transaction to set up the initial game room structure
        const pipeline = this.redisClient.pipeline();
        pipeline.hset(`${gameroomId}`, "id", gameroomId);
        pipeline.sadd(`${gameroomId}:users`, gameRoomData.users);
        pipeline.sadd(`${gameroomId}:challenges`, gameRoomData.challenges);
        await pipeline.exec();
    }

    async getGameRoomData(gameroomId) {
        // Assuming the data is stored as a Redis hash
        const rawData = await this.redisClient.hgetall(`${gameroomId}`);
        if (!rawData) {
            return null;
        }
        return rawData
    }

    async addUserToGameRoom(gameroomId, username) {
        await this.redisClient.sadd(`${gameroomId}:users`, username);
    }

    async addChallengeToGameRoom(gameroomId, challengeId) {
        await this.redisClient.sadd(`${gameroomId}:challenges`, challengeId);
    }

    async getGameRoomUsers(gameroomId) {
        return await this.redisClient.smembers(`${gameroomId}:users`);
    }

    async getGameRoomChallenges(gameroomId) {
        return await this.redisClient.smembers(`${gameroomId}:challenges`);
    }

    async checkUserSession(username) {
        return await this.redisClient.exists(`sess:${username}`);
    }

    async destroySession(sessionId) {
        await this.redisClient.del(`sess:${sessionId}`);
    }

    async getGameRoomData(gameroomId) {
        const attributes = await this.redisClient.hgetall(`${gameroomId}`);
        const users = await this.redisClient.smembers(`${gameroomId}:users`);
        const challenges = await this.redisClient.smembers(`${gameroomId}:challenges`);

        if (!attributes.id) {
            return null;  // Indicates no such game room exists
        }

        return {
            ...attributes,
            users: users,
            challenges: challenges
        };
    }


}

const gameroomStore = new GameRoomStore(redisClient);
module.exports = gameroomStore;
