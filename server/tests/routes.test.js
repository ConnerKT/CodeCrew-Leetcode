const request = require('supertest');
const app = require('../src/app'); // Ensure your path is correct
const redisClient = require('../src/config/redisConfig');


describe('Game Room Management', () => {
    beforeAll(async () => {
      // Preload Redis with necessary data for testing
      await redisClient.set('sess:adyd876gdga', JSON.stringify({ username: 'testuser', gameroomId: '1234' }));
      await redisClient.pipeline()
        .hset('room:1234', '1234')
        .sadd('room:1234:users', ['user1', 'user2'])
        .sadd('room:1234:challenges', ['challenge1', 'challenge2'])
        .exec();
  
    await redisClient.pipeline()
    .set('room:1234', '1234')
    .sadd('room:1234:users', ['user1', 'user2'])
    .sadd('room:1234:challenges', ['challenge1', 'challenge2'])
    .exec();
});

    afterAll(async () => {
      // Clean up Redis
      await redisClient.flushall();
    });
  
    // Existing tests...
  
    it('should retrieve game room data successfully', async () => {
      const response = await request(app).get('/gameroom/1234');
      expect(response.statusCode).toBe(200);
      // expect(response.body.id).toEqual('1234');
      expect(response.body.users).toContain('user1');
      expect(response.body.challenges).toContain('challenge1');
    });
  
    it('should return null for non-existing game room', async () => {
      const response = await request(app).get('/gameroom/nonexistent');
      expect(response.statusCode).toBe(400);
    });
  
    it('should successfully add a new user to an existing game room', async () => {
      const response = await request(app).post('/login').send({ username: 'newuser', gameroomId: '1234' });
      expect(response.statusCode).toBe(200);
  
      const users = await redisClient.smembers('room:1234:users');
      expect(users).toContain('newuser');
    });
  
    it('should fail to add a user to a non-existent game room', async () => {
      const response = await request(app).post('/login').send({ username: 'user', gameroomId: 'nonexistent' });
      expect(response.statusCode).toBe(400);
      expect(response.text).toContain('Game room does not exist');
    });
  
    it('should retrieve game room data successfully', async () => {
      const response = await request(app).get('/gameroom/1234');
      expect(response.statusCode).toBe(200);
      expect(response.body.id).toEqual('1234');
      expect(response.body.users).toContain('user1');
      expect(response.body.challenges).toContain('challenge1');
    });
  
  });
  