import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { RequestExceptionFilter } from './shared/filters/request_exception_filter';
import { pino } from 'pino';

const logger = pino();

config();

const {
  APP_APPLICATION__PORT,
  APP_APPLICATION__VERSIONING,
  APP_APPLICATION__BASE_URL,
} = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useLogger(app.get(Logger));

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new RequestExceptionFilter(httpAdapter));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.setGlobalPrefix(APP_APPLICATION__VERSIONING);

  logger.info(
    `Server is running on - port: ${APP_APPLICATION__PORT} - host: ${APP_APPLICATION__BASE_URL} 🎉`,
  );

  await app.listen(APP_APPLICATION__PORT, APP_APPLICATION__BASE_URL);
}

bootstrap();
