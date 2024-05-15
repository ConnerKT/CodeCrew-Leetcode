import redisClient  from "../config/redisConfig"

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

import Redis from 'ioredis';

class GameRoomStore {
    private redisClient: Redis;

    constructor(redisClient: Redis) {
        this.redisClient = redisClient;
    }

    async gameRoomExists(gameroomId: string): Promise<boolean> {
        const exists = await this.redisClient.call('EXISTS', `room:${gameroomId}`);
        return exists === 1;
    }

    async createGameRoom(gameRoomData: GameRoom): Promise<void> {
        if (await this.gameRoomExists(gameRoomData.id)) {
            throw new Error("Game room already exists");
        }
        await this.redisClient.call('JSON.SET', `room:${gameRoomData.id}`, '$', JSON.stringify(gameRoomData));
    }

    async getGameRoomData(gameroomId: string): Promise<GameRoom | null> {
        const data = await this.redisClient.call('JSON.GET', `room:${gameroomId}`);
        if (!data) {
            return null;
        }
        return JSON.parse(data);
    }

    async addUserToGameRoom(gameroomId: string, user: User): Promise<void> {
        await this.redisClient.call('JSON.ARRAPPEND', `room:${gameroomId}`, '$.users', JSON.stringify(user));
    }

    async getGameRoomUsers(gameroomId: string): Promise<User[]> {
        const users = await this.redisClient.call('JSON.GET', `room:${gameroomId}`, '$.users') as User[];
        return JSON.parse(users) as User[];
    }

    async getGameRoomChallenges(gameroomId: string): Promise<Challenge[]> {
        const challenges = await this.redisClient.call('JSON.GET', `room:${gameroomId}`, '$.challenges');
        return JSON.parse(challenges);
    }

    async removeUserFromGameRoom(gameroomId: string, username: string): Promise<void> {
        const users = await this.getGameRoomUsers(gameroomId);
        const updatedUsers = users.filter(user => user.username !== username);
        await this.redisClient.call('JSON.SET', `room:${gameroomId}`, '$.users', JSON.stringify(updatedUsers));
    }

    async getAllGameRooms(): Promise<GameRoom[]> {
        const keys = await this.redisClient.keys('room:*');
        const gameRooms: GameRoom[] = [];

        for (const key of keys) {
            const roomData = await this.getGameRoomData(key.replace('room:', ''));
            if (roomData) {
                gameRooms.push(roomData);
            }
        }

        return gameRooms;
    }
}

// Example usage
const redisClient = new Redis(); // Connect to Redis with default settings
const gameRoomStore = new GameRoomStore(redisClient);

export default gameRoomStore;
