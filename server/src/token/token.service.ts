import * as uuid from 'uuid/v1';
import { Injectable } from '@nestjs/common';
import { TokenRepository } from './token.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './token.entity'
import { JwtService } from '@nestjs/jwt';
import { DeleteResult } from 'typeorm';
import getTime from 'date-fns/getTime'

@Injectable()
export class TokenService {
  [x: string]: any;
  constructor(
    @InjectRepository(TokenRepository)
    private tokenRepository: TokenRepository,
    private readonly jwtService: JwtService,
  ){}

    async getAll(): Promise<Token[]>{
      return await this.tokenRepository.find()
    }

    async create(user): Promise<Object>{
      const payload = { username: user.username, id: user.id };
      const token = this.jwtService.sign(payload);
      let userToken = new Token();
      userToken.token = token;
      userToken.uId = user.id;
      userToken.fingerPrint = user.fingerPrint;
      userToken.refreshToken = uuid();
      userToken.createTime = new Date().getTime() + '';
      const result = await userToken.save();
      return { 
        token: result.token, 
        refreshToken: result.refreshToken,
        id: user.id, 
        username: user.username 
      }
    }

    async delete(uId: number, token: string): Promise<DeleteResult>{
      return await this.tokenRepository.delete({ uId, token })
    }

    async deleteAll(uId: number): Promise<DeleteResult>{
      return await this.tokenRepository.delete({ uId });
    }

    async exists(uId: number, token: string): Promise<Boolean>{
      const tokenData = await this.tokenRepository.findOne({ uId, token });
      
      return !!tokenData;
    }
}