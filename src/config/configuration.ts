import { env } from 'process';
import { config } from 'dotenv';

const { NODE_ENV, APP_APP__LOG_LEVEL } = env;

config();

export default () => ({
  env: NODE_ENV,
  port: parseInt(env.PORT, 10) || 3000,
  LOG_LEVEL: APP_APP__LOG_LEVEL,
});
