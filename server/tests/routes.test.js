const request = require('supertest');
const app = require('../src/app'); // Ensure your path is correct
const redisClient = require('../src/config/redisConfig');



describe('Game Room Management', () => {
  beforeAll(async () => {
    // Preload Redis with a game room entry

    await redisClient
      .multi()
      .set('session:adyd876gdga', JSON.stringify({ username: 'testuser', gameroomId: '1234' }))
      .exec((err, replies) => {
        expect(err).toBeNull();
      });

    await redisClient
      .multi()
      .set('gameroom:1234', JSON.stringify({ users: [], problems: ['1212', '9917261', '1241652'] }))
      .exec((err, replies) => {
        expect(err).toBeNull();
      });


      let resp = await redisClient.get('gameroom:1234');
      console.log(resp);
  });

  afterAll(async () => {
    await redisClient.flushall();
  });

  it('should fail without username and gameroomId', async () => {
    const response = await request(app).post('/login').send({});
    expect(response.statusCode).toBe(400);
  });

  it('should successfully log in the user to an existing room', async () => {
    const response = await request(app).post('/login').send({ username: 'testuser', gameroomId: '1234' });
    expect(response.statusCode).toBe(200);
    // Additional check for the response body or session data can be done here
  });

  it('should fail to create a game room without an ID', async () => {
    const response = await request(app).post('/gameroom').send({ problems: [] });
    expect(response.statusCode).toBe(400);
  });

  it('should create a new game room', async () => {
    const response = await request(app).post('/gameroom').send({ gameroomId: '5678', problems: ['problem1', 'problem2'] });
    expect(response.statusCode).toBe(201);
    // Verify that the game room was indeed created in the mock Redis
    const roomExists = await redisClient.exists('gameroom:5678');
    expect(roomExists).toBeTruthy();
  });
});