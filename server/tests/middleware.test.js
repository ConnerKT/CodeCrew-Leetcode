// Assuming sessionMiddleware is one directory up and then in the middleware folder
jest.mock('../src/middleware/sessionMiddleware', () => {
  return jest.fn((req, res, next) => {
    req.session = req._testSession;  // Attach a custom session object
    next();
  });
});

const socketMiddleware = require('../src/middleware/socketMiddleware'); // Adjust this path as needed

describe('socketMiddleware', () => {
  it('should allow connection if session has username and gameroomId', done => {
    const socket = {
      request: {
        _testSession: { username: 'testUser', gameroomId: '12345' }
      }
    };
    const next = jest.fn();
    socketMiddleware(socket, next);
    setTimeout(() => {
      expect(next).toHaveBeenCalledWith();
      done();
    }, 100);
  });

  it('should return an error if session does not have required properties', done => {
    const socket = {
      request: {
        _testSession: { username: 'testUser' }  // Missing gameroomId
      }
    };
    const next = jest.fn();
    socketMiddleware(socket, next);
    setTimeout(() => {
      expect(next).toHaveBeenCalledWith(expect.any(Error));
      expect(next.mock.calls[0][0].message).toBe("Authentication error");
      done();
    }, 100);
  });
});



// describe('Redis Mock Test', () => {
//   it('should perform basic operations with mocked Redis', async () => {
//     let rees = await global.redisMock.set('testKey', 'testValue');
//     const value = await global.redisMock.get('testKey');
//     expect(value).toBe('testValue');
//   });

//   it('should handle keys expiration', async () => {
//     await global.redisMock.setex('expireKey', 10, 'willExpire');
//     const valueBefore = await global.redisMock.get('expireKey');
//     expect(valueBefore).toBe('willExpire');

//     // Simulating timeout (redis-mock may not support real-time expiration so this is hypothetical)
//     setTimeout(async () => {
//       const valueAfter = await global.redisMock.get('expireKey');
//       expect(valueAfter).toBeNull();
//     }, 11000);  // Longer than the expiration time
//   });
// });