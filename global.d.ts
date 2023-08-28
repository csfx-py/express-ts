import { GetPublicKeyOrSecret, Secret } from 'jsonwebtoken';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            PORT: string;
            MONGO_URL: string;
            JWT_TOKEN_SECRET: Secret | GetPublicKeyOrSecret;
            JWT_TOKEN_EXPIRES_IN: string;
        }
    }
}
