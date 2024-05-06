const request = require('supertest');
const app = require('../src/app');  // Adjust the path according to your project structure
jest.mock('redis', () => {
  const mockRedis = {
    connect: jest.fn().mockResolvedValue(undefined),
    exists: jest.fn((key) => {
      // Check the key argument and return 0 if it matches "gameroom:1234", else return 1
      if (key === "gameroom:5678") {
        return Promise.resolve(false);  // Simulating that the key does not exist
      }
      return Promise.resolve(true);  // Simulating that the key exists for other cases
    }),
    json: {
      arrIndex: jest.fn().mockResolvedValue(-1),  // Assume user does not exist in the array
      arrAppend: jest.fn().mockResolvedValue(1),  // Mock response for appending to an array
      set: jest.fn().mockResolvedValue('OK'),     // Mock setting JSON data
      get: jest.fn().mockResolvedValue(null)      // Assume initially no data
    },
    duplicate: jest.fn(() => mockRedis),
    on: jest.fn(),
    disconnect: jest.fn()
  };
  return {
    createClient: () => mockRedis
  };
});

describe('User Login Tests', () => {
  it('should fail without username and gameroomId', async () => {
    const response = await request(app).post('/login').send({});
    expect(response.statusCode).toBe(400);
  });

  it('should successfully log in the user', async () => {
    // Assuming Redis responses are mocked as needed
    const response = await request(app).post('/login').send({ username: 'testuser', gameroomId: '1234' });
    expect(response.statusCode).toBe(200);
  });
});

describe('Game Room Management', () => {
  it('should fail to create a game room without an ID', async () => {
    const response = await request(app).post('/gameroom').send({ problems: [] });
    expect(response.statusCode).toBe(400);
  });

  it('should create a game room', async () => {
    // Ensure you mock Redis to simulate game room creation success
    const response = await request(app).post('/gameroom').send({ gameroomId: '5678', problems: ['problem1', 'problem2'] });
    expect(response.statusCode).toBe(201);
  });
});
