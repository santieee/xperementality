import * as bcrypt from 'bcryptjs'
import { Injectable, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/user.entity';
import { TokenService } from 'src/token/token.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService
  ) {}   

  async validateUser(userData: any): Promise<any> {
    const { username, password } = userData;
    const user = await this.usersService.findOne({username});
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  
  async login(CreateUserDto: CreateUserDto, fingerPrint: Object): Promise<Object> {
    const user = await this.validateUser(CreateUserDto);
    if(!user) return HttpStatus.UNAUTHORIZED;
    return await this.tokenService.create({...user, fingerPrint})
  }

  async register(createUserDto: CreateUserDto, fingerPrint: Object): Promise<Object> {
    const { username, password } = createUserDto;
    if(await this.usersService.findOne({username})) return `user with username: ${username} already exist`
    let user = new User();
    user.username = username;
    user.password = bcrypt.hashSync(password, 8);
    user = await user.save();
    return await this.tokenService.create({...user, fingerPrint});
  }

  async logout(token: string): Promise<Object> {
    return await this.tokenService.delete(token);
  }
}