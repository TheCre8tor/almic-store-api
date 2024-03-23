import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { dataSourceOptions } from 'src/database/source/data-source';
import { UsersModule } from 'src/modules/users/users.module';

import { LoggerModule, PinoLogger } from 'nestjs-pino';
import { ConfigModule, ConfigService } from '@nestjs/config';

import configuration from 'src/config/configuration';
import pinoConfig from 'src/config/pino_logger.config';
import { PinoTypeOrmLogger } from 'src/shared/core/typeorm_logger';
import { CurrentUserMiddleware } from 'src/modules/users/middlewares/current_user.middleware';

console.log(`Environment: ${process.env.NODE_ENV}`);

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
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [configuration],
      cache: true,
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return pinoConfig(config);
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
