import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersRepository } from '../repository/users.repository';
import { UserEntity } from '../entities/user.entity';
import { hash } from 'bcrypt';
import { config } from 'dotenv';

config();

const { APP_APP__PASSWORD_HASH_ROUNDS } = process.env;

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    const message = 'User with the email exist in our system';

    let userExist = await this.repository.read(dto.email);
    if (userExist) throw new BadRequestException(message);

    dto.password = await hash(
      dto.password,
      Number(APP_APP__PASSWORD_HASH_ROUNDS),
    );

    return await this.repository.create(dto);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
