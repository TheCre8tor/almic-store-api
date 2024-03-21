import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { dataSourceOptions } from 'src/database/source/data-source';
import { UsersModule } from 'src/modules/users/users.module';

import { LoggerModule, PinoLogger } from 'nestjs-pino';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { v4 as uuidv4 } from 'uuid';
import configuration from 'src/config/configuration';
import { PinoTypeOrmLogger } from 'src/shared/core/typeorm_logger';
import { CurrentUserMiddleware } from 'src/modules/users/middlewares/current_user.middleware';

import { pino } from 'pino';
import colorette from 'colorette';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [PinoLogger],
      useFactory: (logger: PinoLogger): TypeOrmModuleOptions => {
        logger.setContext('TypeOrmModule');

        return {
          ...dataSourceOptions,
          logger: new PinoTypeOrmLogger(logger),
        };
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          pinoHttp: {
            autoLogging: false,
            level: config.get('LOG_LEVEL') || 'trace',
            genReqId: (request) => {
              return request.headers['x-correlation-id'] || uuidv4();
            },
            serializers: {
              req: pino.stdSerializers.wrapRequestSerializer((request) => {
                delete request.headers['authorization'];
                return request;
              }),
            },
          },
        };
      },
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentUserMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
