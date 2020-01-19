import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}   

  async validateUser(userData: any): Promise<any> {
    const { username, password } = userData;
    const user = await this.usersService.findOne({username});
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  
  async login(user: any) {
    if(!await this.validateUser(user)) return 'not found'
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(username: string, password: string){
    if(await this.usersService.findOne({username})) return `user with username: ${username} already exist`
    const user = new User();
    user.username = username;
    user.password = password;
    user.save()
    return user;
  }
}