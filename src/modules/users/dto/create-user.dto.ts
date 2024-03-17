import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name can not be null' })
  @IsString({ message: 'Name should be of type string' })
  name: string;

  @IsNotEmpty({ message: 'Name can not be null' })
  @IsEmail({}, { message: 'Please provide a valid email' })
  email: string;

  @IsNotEmpty({ message: 'Password can not be empty' })
  @MinLength(5, { message: 'Password minimum character should be 5.' })
  password: string;
}
