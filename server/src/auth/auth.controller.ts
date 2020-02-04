import { Controller, Get, Post, Body, UseGuards, Res, Header, Req, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service' 
import { CreateUserDto } from '../user/dto/create-user.dto'
import { AuthGuard } from '@nestjs/passport';
import { SetCookieInterceptor } from './cookie/set-cookie.interceptor';
import { UnSetCookieInterceptor } from './cookie/unset-cookie.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}

  @UseInterceptors(SetCookieInterceptor)
  @Post('register')
  async createTask(
    @Body() createUserDto: CreateUserDto, 
    @Body('fingerPrint') fingerPrint: Object
  ): Promise<Object> {
    return await this.authService.register(createUserDto, fingerPrint)
  }

  @UseInterceptors(SetCookieInterceptor)
  @Post('login')
  async login(
    @Body() createUserDto: CreateUserDto, 
    @Body('fingerPrint') fingerPrint: Object,
  ): Promise<Object> {
    return this.authService.login(createUserDto, fingerPrint);
  }

  @UseInterceptors(UnSetCookieInterceptor)
  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout(@Body('token') token: string): Promise<Object> {
    return this.authService.logout(token)
  }
}
