import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { RequestExceptionFilter } from './shared/filters/request_exception_filter';

config();

const {
  APP_APPLICATION__PORT,
  APP_APPLICATION__VERSIONING,
  APP_APPLICATION__BASE_URL,
} = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useLogger(app.get(Logger));

  app.setGlobalPrefix(APP_APPLICATION__VERSIONING);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new RequestExceptionFilter(httpAdapter));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  await app.listen(APP_APPLICATION__PORT, APP_APPLICATION__BASE_URL);
}

bootstrap();
