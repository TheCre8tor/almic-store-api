import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { RequestExceptionFilter } from './shared/filters/request_exception_filter';

config();

const { APP_APP__PORT, APP_APP__VERSIONING } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useLogger(app.get(Logger));

  app.setGlobalPrefix(APP_APP__VERSIONING);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new RequestExceptionFilter(httpAdapter));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  await app.listen(APP_APP__PORT);
}

bootstrap();
