import { Controller, Get, UseGuards, Post, Body, Delete } from '@nestjs/common';
import { TokenService } from './token.service';
import { AuthGuard } from '@nestjs/passport';
import { Token } from './token.entity';
import { DeleteResult } from 'typeorm';

@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService){}

  @Get()
  async getAllToken(): Promise<Token[]>{
    return await this.tokenService.getAll()
  }

  @Post('refresh')
  async refreshToken(@Body() user: Object){
    return await this.tokenService.refresh(user)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteAll(@Body('userId') userId: number): Promise<DeleteResult>{
    return await this.tokenService.deleteAll(userId)
  }
}
