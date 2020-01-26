import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository' 
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository, 
  ){}
 

  async getUsers():Promise<User[]>{
    return await this.userRepository.find()
  }

  async findOne(userInfo): Promise<User | undefined> {
    const result = await this.userRepository.findOne(userInfo);
    return result;
  }
}