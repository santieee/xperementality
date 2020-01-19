import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService){}

  @Post('register')
  async createTask(@Body('username') username: string, @Body('password') password: string) {
    return await this.authService.register(username, password)
  }

  @Post('login')
  async login(@Body('username') username: string, @Body('password') password: string) {
    return this.authService.login({username, password});
  }
}
