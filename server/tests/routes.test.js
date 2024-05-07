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






describe('Problem Management', () => {
  it('should retrieve all problems', async () => {
    const response = await request(app).get('/problems');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it('should retrieve problems by IDs', async () => {
    const response = await request(app).post('/problemsbyid').send({ ids: ['1', '2', '3'] });
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it('should delete a problem by ID', async () => {
    const response = await request(app).delete('/problems/1');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Problem deleted successfully");
  });

  it('should return 404 when deleting a non-existing problem', async () => {
    const response = await request(app).delete('/problems/nonexistent');
    expect(response.statusCode).toBe(404);
  });

  it('should update a problem by ID', async () => {
    const response = await request(app).put('/problems/1').send({ title: 'Updated Problem' });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Problem updated successfully");
  });

  it('should return 404 when updating a non-existing problem', async () => {
    const response = await request(app).put('/problems/nonexistent').send({ title: 'Attempt Update' });
    expect(response.statusCode).toBe(404);
  });
});