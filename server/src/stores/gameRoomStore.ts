import Redis from 'ioredis';
import challengeStore from './challengeStore';
import { GameRoom, User, Challenge } from "../models";
import redisClient from "../config/redisConfig";

class GameRoomStore {
    private redisClient: Redis;
    public subRedisClient: Redis;
    constructor(redisClient: Redis) {
        this.redisClient = redisClient;
        this.redisClient.once("connect", () => {
            this.subRedisClient = redisClient.duplicate();
            let gameRooms = this.getAllGameRooms();
            gameRooms.then((rooms) => {
                for (const room of rooms) {
                    console.log(`Subscribing to channel:room:${room.id}`);
                    this.subRedisClient.subscribe(`channel:room:${room.id}`);
                }
            })
        })
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
        const challenges = await challengeStore.getChallengesByIds(challengeIds);

        const newGameRoom = new GameRoom(gameRoomId, challenges);
        await this.redisClient.call('JSON.SET', `room:${gameRoomId}`, '$', JSON.stringify(newGameRoom));
        await this.redisClient.expire(`room:${gameRoomId}`, 86400); // Set expiration time to 86400 seconds (1 day)
        
        // Create a channel for the room
        await this.redisClient.publish(`channel:room:${gameRoomId}`, JSON.stringify(newGameRoom));
        await this.subRedisClient.subscribe(`channel:room:${gameRoomId}`);

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
        await this.redisClient.call('JSON.ARRAPPEND', `room:${gameroomId}`, '$.users', JSON.stringify(user));
        const gameRoomData = await this.getGameRoomData(gameroomId);
        if (gameRoomData) {
            await this.redisClient.publish(`channel:room:${gameroomId}`, JSON.stringify(gameRoomData));
        }
    }
    async getGameRoomUsers(gameroomId: string): Promise<User[]> {
        let gameRoom = await this.getGameRoomData(gameroomId)
        let users: User[] = gameRoom ? gameRoom.users : [];

        return users;
    }


    async removeUserFromGameRoom(gameroomId: string, username: string): Promise<void> {
        const users = await this.getGameRoomUsers(gameroomId);
        let userToRemoveIndex = users.indexOf(users.find(user => user.username === username));
        await this.redisClient.call('JSON.ARRPOP', `room:${gameroomId}`, '$.users', userToRemoveIndex);
        const gameRoomData = await this.getGameRoomData(gameroomId);
        if (gameRoomData) {
            await this.redisClient.publish(`channel:room:${gameroomId}`, JSON.stringify(gameRoomData));
        }
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

const gameRoomStore = new GameRoomStore(redisClient);

export default gameRoomStore;
