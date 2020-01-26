import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service' 
import { CreateUserDto } from '../users/dto/create-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}

  @Post('register')
  async createTask(@Body() CreateUserDto: CreateUserDto): Promise<Object> {
    console.log(CreateUserDto)
    return await this.authService.register(CreateUserDto)
  }

  @Post('login')
  async login(@Body() CreateUserDto: CreateUserDto): Promise<Object> {
    return this.authService.login(CreateUserDto);
  }
}
