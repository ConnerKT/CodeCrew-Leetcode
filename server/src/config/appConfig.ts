import dotenv from "dotenv"
dotenv.config();

class AppConfig {
    ENVIRONMENT: string;
    PORT: number;
    CORS_URLS: string[];
    REDIS_CONNECTION_STRING: string;
    MONGO_CONNECTION_STRING: string;
    JUDGE0_API_URL: string;
    JUDGE0_API_KEY: string;

    constructor() {
        this.ENVIRONMENT = process.env.ENVIRONMENT || 'TEST';
        this.PORT = Number(process.env.PORT) || 3001;
        this.CORS_URLS = process.env.CORS_URLS?.split(",") || ["http://localhost:5500", "http://localhost:3000", "https://codecrew-leetcode.onrender.com"];
        this.REDIS_CONNECTION_STRING = this.getEnvVariableOrThrowError('REDIS_CONNECTION_STRING');
        this.MONGO_CONNECTION_STRING = this.getEnvVariableOrThrowError('MONGO_CONNECTION_STRING');
        this.JUDGE0_API_URL = this.getEnvVariableOrThrowError('JUDGE0_API_URL');
        this.JUDGE0_API_KEY = this.getEnvVariableOrThrowError('JUDGE0_API_KEY');
    }

    getEnvVariableOrThrowError(key: string): string {
        const value = process.env[key];
        if (value === undefined) {
            console.error(`Environment variable ${key} is not set`);
            process.exit(1);
        }
        return value;
    }

}

const appConfig = new AppConfig();
export default appConfig;
