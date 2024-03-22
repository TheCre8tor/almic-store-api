import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AuthSignInDto } from '../dto/auth-signin.dto';
import { JSendSuccessResponse } from 'src/shared/core/api.response';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CurrentUser } from '../decorators/current_user.decorator';
import { UserEntity } from '../entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(
    @InjectPinoLogger(UsersController.name)
    private readonly logger: PinoLogger,
    private readonly usersService: UsersService,
  ) {}

  @Get('health-check')
  async systemHealth() {
    let response: JSendSuccessResponse = {
      status: 'success',
      message: 'system health status: [alive]',
      data: {
        title: 'almic-api service v1.0',
        performance: 'stable',
      },
    };

    this.logger.info('Checking system health status: [DONE]');

    return response;
  }

  @Post('/signup')
  async signup(@Body() dto: CreateUserDto): Promise<JSendSuccessResponse> {
    this.logger.assign({ user_email: dto.email });

    const response = await this.usersService.signup(dto);

    const data: JSendSuccessResponse = {
      status: 'success',
      message: 'Account created successfully',
      data: response,
    };

    return data;
  }

  @Post('/signin')
  async signin(@Body() dto: AuthSignInDto): Promise<JSendSuccessResponse> {
    this.logger.assign({ user_email: dto.email });

    this.logger.info('Signing user into the system: [START]');
    const response = await this.usersService.signin(dto);
    this.logger.info('Signing user into the system: [END]');

    this.logger.info('Signed in successfully: [DONE]');
    const data: JSendSuccessResponse = {
      status: 'success',
      message: 'Successfully signin!',
      data: response,
    };

    return data;
  }

  @Get()
  async getUsers(): Promise<JSendSuccessResponse> {
    const response = await this.usersService.getUsers();

    const data: JSendSuccessResponse = {
      status: 'success',
      message: 'Data fetched!',
      data: response,
    };

    return data;
  }

  // custom param getter must be at the top of
  @Get('/profile')
  getProfile(@CurrentUser() currentUser: UserEntity) {
    const data: JSendSuccessResponse = {
      status: 'success',
      message: 'Data fetched!',
      data: {
        user: currentUser,
      },
    };

    return data;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<JSendSuccessResponse> {
    const response = await this.usersService.getUser(id);

    const data: JSendSuccessResponse = {
      status: 'success',
      message: 'Data fetched!',
      data: response,
    };

    return data;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
