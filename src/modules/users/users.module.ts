import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { UsersRepository } from './repository/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), LoggerModule.forRoot()],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
