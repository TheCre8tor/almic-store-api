import { env } from 'process';
import { config } from 'dotenv';

const {
  NODE_ENV,
  APP_APPLICATION__LOG_LEVEL,
  APP_APPLICATION__PASSWORD_HASH_ROUNDS,
  APP_APPLICATION__ACCESS_TOKEN_SECRET_KEY,
  APP_APPLICATION__ACCESS_TOKEN_EXPIRE_TIME,
} = env;

console.log(`NODE_ENV: ${NODE_ENV}`);

config();

export default () => ({
  env: NODE_ENV,
  port: parseInt(env.PORT, 10) || 3000,
  LOG_LEVEL: APP_APPLICATION__LOG_LEVEL,
  PASSWORD_HASH_ROUNDS: APP_APPLICATION__PASSWORD_HASH_ROUNDS,
  TOKEN_SECRET_KEY: APP_APPLICATION__ACCESS_TOKEN_SECRET_KEY,
  TOKEN_EXPIRE_TIME: APP_APPLICATION__ACCESS_TOKEN_EXPIRE_TIME,
});
