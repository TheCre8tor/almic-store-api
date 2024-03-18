import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersRepository } from '../repository/users.repository';
import { UserEntity } from '../entities/user.entity';
import { compare, hash } from 'bcrypt';
import { config } from 'dotenv';
import { AuthSignInDto } from '../dto/auth-signin.dto';
import { sign } from 'jsonwebtoken';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

config();

const {
  APP_APP__PASSWORD_HASH_ROUNDS,
  APP_APP__ACCESS_TOKEN_SECRET_KEY,
  APP_APP__ACCESS_TOKEN_EXPIRE_TIME,
} = process.env;

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly repository: UsersRepository) {}

  async signup(dto: CreateUserDto): Promise<UserEntity> {
    this.logger.log('hello world');
    const message = 'User with the email exist in our system';

    let userExist = await this.repository.readByEmail(dto.email);
    if (userExist) throw new BadRequestException(message);

    dto.password = await hash(
      dto.password,
      Number(APP_APP__PASSWORD_HASH_ROUNDS),
    );

    const createdUser = await this.repository.create(dto);
    if (createdUser) {
      // send an email to user
    }

    return createdUser;
  }

  async signin(dto: AuthSignInDto): Promise<{}> {
    let user = await this.repository.queryByEmail(dto.email);
    if (!user) throw new BadRequestException('Bad credentials.');

    const matchPassword = await compare(dto.password, user.password);
    if (!matchPassword) throw new BadRequestException('Bad credentials.');

    delete user.password;

    const accessToken = this.generateAccessToken(user);
    let response = { access_token: accessToken, user: user };

    return response;
  }

  async getUsers(): Promise<UserEntity[]> {
    return await this.repository.read();
  }

  async getUser(id: string): Promise<UserEntity> {
    const user = await this.repository.readOneById(id);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private generateAccessToken(user: UserEntity): string {
    return sign(
      { id: user.id, email: user.email },
      APP_APP__ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: APP_APP__ACCESS_TOKEN_EXPIRE_TIME },
    );
  }
}
