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

@Controller('users')
export class UsersController {
  constructor(
    @InjectPinoLogger(UsersController.name)
    private readonly logger: PinoLogger,
    private readonly usersService: UsersService,
  ) {}

  @Post('/signup')
  async signup(@Body() dto: CreateUserDto): Promise<JSendSuccessResponse> {
    this.logger.assign({ userID: '42' });

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
    const response = await this.usersService.signin(dto);

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
