



require('dotenv').config(); // Load environment variables from .env file

class AppConfig {
    constructor() {
        this.ENVIRONMENT = process.env.ENVIRONMENT || 'TEST';
        this.PORT = process.env.PORT || 3001;
        this.CORS_URLS = process.env.CORS_URLS?.split(",") || ["http://localhost:5500", "http://localhost:3000", "https://codecrew-leetcode.onrender.com"] //sample env value: "http://localhost:5500","http://localhost:3000","https://codecrew-leetcode.onrender.com"
        this.REDIS_CONNECTION_STRING = process.env.REDIS_CONNECTION_STRING;
        this.MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

        // Assert that all properties are set
        const missingProperties = [];
        if (!this.CORS_URLS) {
            missingProperties.push('CORS_URLS');
        }
        if (!this.REDIS_CONNECTION_STRING) {
            missingProperties.push('REDIS_CONNECTION_STRING');
        }
        if (!this.MONGO_CONNECTION_STRING) {
            missingProperties.push('MONGO_CONNECTION_STRING');
        }

        if (missingProperties.length > 0 && this.ENVIRONMENT !== "TEST") {
            throw new Error(`Missing required environment variables : ${missingProperties.join(', ')}`);
        }
        
        console.log(`Running in ${this.ENVIRONMENT} environment`);
    }
}
const appConfig = new AppConfig();
module.exports = appConfig;