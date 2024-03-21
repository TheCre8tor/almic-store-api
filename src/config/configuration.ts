import { env } from 'process';
import { config } from 'dotenv';

const {
  NODE_ENV,
  APP_APP__LOG_LEVEL,
  APP_APP__PASSWORD_HASH_ROUNDS,
  APP_APP__ACCESS_TOKEN_SECRET_KEY,
  APP_APP__ACCESS_TOKEN_EXPIRE_TIME,
} = env;

config();

export default () => ({
  env: NODE_ENV,
  port: parseInt(env.PORT, 10) || 3000,
  LOG_LEVEL: APP_APP__LOG_LEVEL,
  PASSWORD_HASH_ROUND: APP_APP__PASSWORD_HASH_ROUNDS,
  TOKEN_SECRET_KEY: APP_APP__ACCESS_TOKEN_SECRET_KEY,
  TOKEN_EXPIRE_TIME: APP_APP__ACCESS_TOKEN_EXPIRE_TIME,
});