
import { mock, describe, beforeAll, afterAll, test, expect, it } from 'bun:test';
import redisClient from "../src/config/redisConfig"
import request, {Test} from 'supertest';
import { GameRoom } from '../src/models';
// Ensure that your mocking happens before this import if it initializes Redis
import {sampleChallenges} from './sampledata';

import app from "../src/app";


describe('Game Room Management', () => {
    it('should retrieve game room data successfully', async () => {
        let roomId = "1234"
        let expectedGameRoomDataJson = await redisClient.get(`room:${roomId}`)
        if (!expectedGameRoomDataJson) {
            throw new Error("No game room data found")
        }
        
        let expectedGameRoomData: GameRoom | null = JSON.parse(expectedGameRoomDataJson)

        const response = await request(app).get(`/gameroom/${roomId}`);
        expect(response.statusCode).toBe(200);

        let gameRoomData: GameRoom = response.body;
        expect(gameRoomData).toEqual(expectedGameRoomData);

    });

    it('should return 404 when game room does not exist', async () => {
        let roomId = "redBama"
        const response = await request(app).get(`/gameroom/${roomId}`);
        expect(response.statusCode).toBe(404);
    });

    it('should create a new game room successfully', async () => {
        let roomId = "spicygrandma"
        let challengeIds = sampleChallenges.map(challenge => challenge._id)
        const response = await request(app).post('/gameroom').send({gameRoomId: roomId, challengeIds});


        expect(response.statusCode).toBe(201);
        
        let expectedGameRoomDataJson = await redisClient.get(`room:${roomId}`)
        if (!expectedGameRoomDataJson) {
            throw new Error("No game room data found")
        }
        let expectedGameRoomData: GameRoom | null = JSON.parse(expectedGameRoomDataJson)
        expect(roomId.toString()).toEqual(expectedGameRoomData.id);


    });
});
