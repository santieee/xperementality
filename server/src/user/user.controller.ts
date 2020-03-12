import { Controller, Post, Body, Get, UseGuards, Param, Req, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { UserService } from './user.service'
import { TokenService } from '../token/token.service'
import { S3Service } from '../s3/s3.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';


@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private s3Service: S3Service,
    private jwtService: JwtService
  ){}

  @Get('list')
  async getUsers():Promise<User[]>{
    return await this.userService.getUsers()
  }

  @Post('avatar')
  async saveAvatar(@Req() request, @Res() response){
    const userToken = request.headers.authorization.split(' ')[1];
    const { username } = this.jwtService.verify(userToken);

    await this.s3Service.photoUpload(
      request, 
      response, 
      'photo', 
      photoPath => this.userService.savePhoto({username, photoPath})
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile/:username')
  async getUser(@Param('username') username: string, @Req() request):Promise<Object>{
    const sessions = await this.tokenService.getAllByUserId(request.user.id);
    const profile = await this.userService.findOne({username});
    return { profile, sessions };
  }
}
