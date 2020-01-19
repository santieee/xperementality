import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service'
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService){}

  @Get('list')
  async getUsers(){
    return await this.userService.getUsers()
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getUser(@Body('username') username: string){
    return await this.userService.findOne({username})
  }
}
