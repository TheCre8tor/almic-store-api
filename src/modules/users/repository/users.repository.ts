import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly database: Repository<UserEntity>,
  ) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    let user = this.database.create(dto);
    user = await this.database.save(user);

    delete user.password;
    delete user.roles;
    delete user.deleted_at;

    return user;
  }

  async read(email: string): Promise<UserEntity> {
    return await this.database.findOneBy({ email });
  }
}
