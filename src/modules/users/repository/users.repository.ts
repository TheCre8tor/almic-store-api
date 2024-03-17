import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly database: Repository<UserEntity>,
  ) {}

  async create(dto: any) {
    const user = this.database.create(dto);
    return await this.database.save(user);
  }
}
