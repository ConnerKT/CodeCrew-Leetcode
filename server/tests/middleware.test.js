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

