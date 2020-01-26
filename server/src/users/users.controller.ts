import { Controller, Post, Body, Get, UseGuards, Param } from '@nestjs/common';
import { UsersService } from './users.service'
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService){}

  @Get('list')
  async getUsers():Promise<User[]>{
    return await this.userService.getUsers()
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile/:username')
  async getUser(@Param('username') username: string):Promise<User>{
    return await this.userService.findOne({username})
  }
}
