import { IsNotEmpty, IsInt, IsString } from 'class-validator'

export class CreateMessageDto {
  @IsInt()
  uId: number 
  @IsString()
  message: string;
}
