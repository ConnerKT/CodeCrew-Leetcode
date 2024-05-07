// Assuming mockSessionMiddleware should intercept calls to the actual middleware
const socketMiddleware = require("../src/middleware/socketMiddleware");
const sessionMiddleware = require("../src/middleware/sessionMiddleware");
jest.mock("../src/middleware/sessionMiddleware");


describe("Socket Middleware Tests", () => {
    let mockSocket, next;
  
    beforeEach(() => {
      // Resetting the mock implementation before each test to ensure a clean setup
      sessionMiddleware.mockImplementation((req, res, next) => {
        // Default to no session unless explicitly set in a test
        req.session = {};
        next();
      });
  
      mockSocket = {
        request: {
          session: {}
        }
      };
      next = jest.fn();
    });
  
    it("should pass authentication when session is set", () => {
      // Setting up session data for this specific test
      sessionMiddleware.mockImplementation((req, res, next) => {
        req.session = {
          username: "testUser",
          gameroomId: "room1"
        };
        next();
      });
  
      socketMiddleware(mockSocket, next);
      expect(next).toHaveBeenCalledWith(); // No arguments indicate success
    });
  
    it("should fail authentication with no session", () => {
      // Here, the session is not set, following the beforeEach setup
      socketMiddleware(mockSocket, next);
      expect(next).toHaveBeenCalledWith(new Error("Authentication error"));
    });
  });