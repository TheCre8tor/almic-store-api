import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

config();

const { APP_APP__PORT, APP_APP__VERSIONING } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(APP_APP__VERSIONING);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(APP_APP__PORT);
}

bootstrap();
