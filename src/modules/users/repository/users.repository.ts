import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
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

  async read(): Promise<UserEntity[]> {
    return await this.database.find();
  }

  async readOneById(id: string): Promise<UserEntity> {
    return await this.database.findOneBy({ id });
  }

  async readByEmail(email: string): Promise<UserEntity> {
    return await this.database.findOneBy({ email });
  }

  async queryByEmail(email: string): Promise<UserEntity> {
    const user = await this.database
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email=:email', { email: email })
      .getOne();

    return user;
  }
}
