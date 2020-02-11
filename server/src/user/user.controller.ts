import { Controller, Post, Body, Get, UseGuards, Param, Req } from '@nestjs/common';
import { UserService } from './user.service'
import { TokenService } from '../token/token.service'
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    ){}

  @Get('list')
  async getUsers():Promise<User[]>{
    return await this.userService.getUsers()
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile/:username')
  async getUser(@Param('username') username: string, @Req() request):Promise<Object>{
    const sessions = await this.tokenService.getAllByUserId(request.user.id);
    const profile = await this.userService.findOne({username});
    return { profile, sessions };
  }
}
