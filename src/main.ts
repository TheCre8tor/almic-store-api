import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { config } from 'dotenv';

config();

const { APP_APP__PORT, APP_APP__VERSIONING } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(APP_APP__VERSIONING);

  await app.listen(APP_APP__PORT);
}

bootstrap();
