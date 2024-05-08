const redisClient = require("../config/redisConfig");

class GameRoomStore {
    constructor(redisClient) {
        this.redisClient = redisClient;
    }

    async gameRoomExists(gameroomId) {
        return await this.redisClient.exists(`room:${gameroomId}`);
    }

    async createGameRoom(gameroomId, gameRoomData) {
        if (await this.gameRoomExists(gameroomId)) {
            throw new Error("Game room already exists");
        }
        // Use a transaction to set up the initial game room structure
        const pipeline = this.redisClient.pipeline();
        pipeline.set(`${gameroomId}`, gameroomId);
        pipeline.set(`room:${gameroomId}`, gameroomId);
        pipeline.sadd(`room:${gameroomId}:users`, gameRoomData.users);
        pipeline.sadd(`room:${gameroomId}:challenges`, gameRoomData.challenges);
        await pipeline.exec();
    }

    // async getGameRoomData(gameroomId) {
    //     // Assuming the data is stored as a Redis hash
    //     const rawData = await this.redisClient.get(`${gameroomId}`);
    //     if (!rawData) {
    //         return null;
    //     }
    //     return rawData
    // }

    async addUserToGameRoom(gameroomId, username) {
        await this.redisClient.sadd(`room:${gameroomId}:users`, username);
    }

    async addChallengeToGameRoom(gameroomId, challengeId) {
        await this.redisClient.sadd(`room:${gameroomId}:challenges`, challengeId);
    }

    async getGameRoomUsers(gameroomId) {
        return await this.redisClient.smembers(`room:${gameroomId}:users`);
    }

    async getGameRoomChallenges(gameroomId) {
        return await this.redisClient.smembers(`room:${gameroomId}:challenges`);
    }

    async checkUserSession(username) {
        return await this.redisClient.exists(`sess:${username}`);
    }

    async destroySession(sessionId) {
        await this.redisClient.del(`sess:${sessionId}`);
    }

    //remove user from gameroom
    async removeUserFromGameRoom(gameroomId, username) {
        await this.redisClient.srem(`room:${gameroomId}:users`, username);
    }

    async getGameRoomData(gameroomId) {

        const users = await this.redisClient.smembers(`room:${gameroomId}:users`);
        const challenges = await this.redisClient.smembers(`room:${gameroomId}:challenges`);

        return {
            id: gameroomId,
            users: users,
            challenges: challenges
        };
    }

    async getAllGameRooms() {
        // Assuming all game rooms are stored with a common prefix like 'gameroom'
        const keys = await this.redisClient.keys('*');
        const gameRooms = [];

        for (const key of keys) {
            if (key.includes(':')) continue; // Skip associated sets (users, challenges)
            const roomData = await this.getGameRoomData(key);
            if (roomData) {
                gameRooms.push(roomData);
            }
        }

        return gameRooms;
    }

}

const gameroomStore = new GameRoomStore(redisClient);
module.exports = gameroomStore;
