import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/user.entity';
import { TokenService } from 'src/token/token.service';
import { CreateUserDto } from '../users/dto/create-user.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService
  ) {}   

  async validateUser(userData: any): Promise<any> {
    const { username, password } = userData;
    const user = await this.usersService.findOne({username });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  
  async login(CreateUserDto: CreateUserDto): Promise<Object> {
    const user = await this.validateUser(CreateUserDto);
    if(!user) return new UnauthorizedException;
    return await this.tokenService.create(user)
  }

  async register(CreateUserDto: CreateUserDto): Promise<Object>{
    const { username, password } = CreateUserDto;
    if(await this.usersService.findOne({username})) return `user with username: ${username} already exist`
    const user = new User();
    user.username = username;
    user.password = password;
    await user.save()
    return await this.tokenService.create(user);
  }
}