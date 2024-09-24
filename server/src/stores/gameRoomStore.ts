import Redis from 'ioredis';
import challengeStore from './challengeStore';
import { GameRoom, User, Challenge, UserSubmission } from "../models";
import redisClient from "../config/redisConfig";
import { SubmissionResult } from '../services/judge0/judge0Service';

class GameRoomStore {
    private redisClient: Redis;
    public subRedisClient: Redis;
    constructor(redisClient: Redis) {
        this.redisClient = redisClient;
        this.redisClient.once("connect", async () => {
            await redisClient.config('SET', 'notify-keyspace-events', 'KEn$sm');

            this.subRedisClient = redisClient.duplicate();
            await this.subRedisClient.psubscribe('__keyevent@*__:*');
        })
    }


    async gameRoomExists(gameroomId: string): Promise<boolean> {
        const exists = await this.redisClient.exists(`room:${gameroomId}`);
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
        if (challenges.length == 0) {
            throw new Error(`Could not create gameroom. Could not find challenges with ids ${challengeIds}`)
        }

        const newGameRoom = new GameRoom(gameRoomId, challenges);
        await this.redisClient.set(`room:${gameRoomId}`, JSON.stringify(newGameRoom));
        await this.redisClient.expire(`room:${gameRoomId}`, 86400); // Set expiration time to 86400 seconds (1 day)


    }

    async getGameRoomData(gameroomId: string): Promise<GameRoom | null> {
        const response = await this.redisClient.get(`room:${gameroomId}`);
        let gameRoomData: GameRoom | null = null;
        if (response != null) {
            gameRoomData = JSON.parse(response);
        }
        return gameRoomData;
    }

    async addUserToGameRoom(gameroomId: string, user: User): Promise<void> {
        const gameRoomData = await this.getGameRoomData(gameroomId);
        if (gameRoomData) {
            gameRoomData.users.push(user);
            await this.redisClient.set(`room:${gameroomId}`, JSON.stringify(gameRoomData));
            // await this.redisClient.publish(`channel:room:${gameroomId}`, JSON.stringify(gameRoomData));
        }
    }
    async getGameRoomUsers(gameroomId: string): Promise<User[]> {
        let gameRoom = await this.getGameRoomData(gameroomId)
        let users: User[] = gameRoom ? gameRoom.users : [];

        return users;
    }


    async removeUserFromGameRoom(gameroomId: string, username: string): Promise<void> {
        const gameRoomData = await this.getGameRoomData(gameroomId);
        if (gameRoomData) {
            const userToRemoveIndex = gameRoomData.users.findIndex(user => user.username === username);
            if (userToRemoveIndex !== -1) {
                gameRoomData.users.splice(userToRemoveIndex, 1);
                await this.redisClient.set(`room:${gameroomId}`, JSON.stringify(gameRoomData));
                // await this.redisClient.publish(`channel:room:${gameroomId}`, JSON.stringify(gameRoomData));
            }
        }
    }

    async addUserSubmissionToGameRoom(gameroomId: string, userSubmission: UserSubmission, submissionResult: SubmissionResult){
        const gameRoomData = await this.getGameRoomData(gameroomId);
        if (gameRoomData) {
            for(let i = 0; i < gameRoomData.challenges.length; i++){
                if(gameRoomData.challenges[i].id === userSubmission.challengeId){
                    gameRoomData.challenges[i].userSubmissions[userSubmission.userId] = {...userSubmission,...submissionResult}
                    await this.redisClient.set(`room:${gameroomId}`, JSON.stringify(gameRoomData));
                    return
                }
            }
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