import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service' 
import { CreateUserDto } from '../users/dto/create-user.dto'
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}

  @Post('register')
  async createTask(@Body() CreateUserDto: CreateUserDto, @Body('fingerPrint') fingerPrint: Object): Promise<Object> {
    console.log(CreateUserDto)
    return await this.authService.register(CreateUserDto, fingerPrint)
  }

  @Post('login')
  async login(@Body() CreateUserDto: CreateUserDto, @Body('fingerPrint') fingerPrint: Object): Promise<Object> {
    return this.authService.login(CreateUserDto, fingerPrint);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout(@Body('token') token: string): Promise<Object> {
    return this.authService.logout(token)
  }
}
