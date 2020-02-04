import { IsString, IsInt, MinLength, IsObject, IsEmpty } from 'class-validator';

export class CreateTokenDto {
  @IsObject()
  fingerPrint: object;
  
  @IsInt()
  id: number

  @IsString()
  username: string;

  @MinLength(6, { message: "Password is too short" })
  @IsString()
  password: string;
}