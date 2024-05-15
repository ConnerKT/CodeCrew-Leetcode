import dotenv from "dotenv"
dotenv.config();

class AppConfig {
    ENVIRONMENT: string;
    PORT: number;
    CORS_URLS: string[];
    REDIS_CONNECTION_STRING: string;
    MONGO_CONNECTION_STRING: string;

    constructor() {
        this.ENVIRONMENT = process.env.ENVIRONMENT || 'TEST';
        this.PORT = Number(process.env.PORT) || 3001;
        this.CORS_URLS = process.env.CORS_URLS?.split(",") || ["http://localhost:5500", "http://localhost:3000", "https://codecrew-leetcode.onrender.com"];
        this.REDIS_CONNECTION_STRING = this.getEnvVariableOrThrowError('REDIS_CONNECTION_STRING');
        this.MONGO_CONNECTION_STRING = this.getEnvVariableOrThrowError('MONGO_CONNECTION_STRING');
    }

    getEnvVariableOrThrowError(key: string): string {
        const value = process.env[key];
        if (value === undefined) {
            throw new Error(`Environment variable ${key} is not defined`);
        }
        return value;
    }

}

const appConfig = new AppConfig();
export default appConfig;
