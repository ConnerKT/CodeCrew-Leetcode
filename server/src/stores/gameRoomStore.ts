import Redis from 'ioredis';
import challengeStore from './challengeStore';
import { GameRoom, User, Challenge } from "../models";
import redisClient from "../config/redisConfig"


class GameRoomStore {
    private redisClient: Redis;

    constructor(redisClient: Redis) {
        this.redisClient = redisClient;
    }

    async gameRoomExists(gameroomId: string): Promise<boolean> {
        const exists = await this.redisClient.call('EXISTS', `room:${gameroomId}`);
        let result = false;
        if (exists === 1) {
            result = true;
        }
        return result;
    }

    async createGameRoom(gameRoomId: string, challengeIds: string[]): Promise<void> {
        const exists = await this.gameRoomExists(gameRoomId);
        if (exists) {
            throw new Error("Game room already exists");
        }
        console.log("challengeIds", challengeIds);
        const challenges = await challengeStore.getChallengesByIds(challengeIds);

        const newGameRoom = new GameRoom(gameRoomId, challenges);
        console.log("newGameRoom", newGameRoom);
        await this.redisClient.call('JSON.SET', `room:${gameRoomId}`, '$', JSON.stringify(newGameRoom));
        await this.redisClient.expire(`room:${gameRoomId}`, 86400); // Set expiration time to 86400 seconds (1 day)
    }

    async getGameRoomData(gameroomId: string): Promise<GameRoom | null> {
        const response = await this.redisClient.call('JSON.GET', `room:${gameroomId}`) as string | null;
        let gameRoomData: GameRoom | null = null;
        if (response != null) {
            gameRoomData = JSON.parse(response);
        }
        return gameRoomData;
    }

    async addUserToGameRoom(gameroomId: string, user: User): Promise<void> {
        let response = await this.redisClient.call('JSON.ARRAPPEND', `room:${gameroomId}`, '$.users', JSON.stringify(user));
    }

    async getGameRoomUsers(gameroomId: string): Promise<User[]> {
        const response = await this.redisClient.call('JSON.GET', `room:${gameroomId}`, '$.users') as string | null;
        let users: User[] = [];
        if (response != null) {
            users = JSON.parse(response);
        }
        return users;
    }

    async getGameRoomChallenges(gameroomId: string): Promise<Challenge[]> {
        const response = await this.redisClient.call('JSON.GET', `room:${gameroomId}`, '$.challenges') as string | null;
        let challenges: Challenge[] = [];
        if (response != null) {
            challenges = JSON.parse(response);
        }
        return challenges;
    }

    async removeUserFromGameRoom(gameroomId: string, username: string): Promise<void> {
        const users = await this.getGameRoomUsers(gameroomId);
        const updatedUsers = users.filter(function(user) {
            return user.username !== username;
        });
        let response = await this.redisClient.call('JSON.SET', `room:${gameroomId}`, '$.users', JSON.stringify(updatedUsers));
    }

    async getAllGameRooms(): Promise<GameRoom[]> {
        const keys = await this.redisClient.keys('room:*');
        let gameRooms: GameRoom[] = [];
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
const gameRoomStore = new GameRoomStore(redisClient);

export default gameRoomStore;
