import { IsString, IsInt, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @MinLength(6, { message: "Password is too short" })
  @IsString()
  password: string;
}