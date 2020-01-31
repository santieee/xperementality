import * as uuid from 'uuid/v1';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TokenRepository } from './token.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './token.entity'
import { JwtService } from '@nestjs/jwt';
import { DeleteResult } from 'typeorm';

@Injectable()
export class TokenService {
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
      const token = this.jwtService.sign(payload, { expiresIn: '1d' });
      let userToken = new Token();
      userToken.token = token;
      userToken.uId = user.id;
      userToken.fingerPrint = JSON.stringify(user.fingerPrint);
      userToken.refreshToken = this.jwtService.sign(payload, { expiresIn: '60d' });
      const result = await userToken.save();
      return { 
        token: result.token, 
        refreshToken: result.refreshToken,
        id: user.id, 
        username: user.username 
      }
    }

    async refresh(user): Promise<Object>{
      const oldToken = await this.tokenRepository.findOne({ refreshToken: user.refreshToken });
      if(!oldToken) return new NotFoundException();
      const isValidFingrPrint = oldToken.fingerPrint == JSON.stringify(user.fingerPrint);
      oldToken.remove()
      if(!isValidFingrPrint) return new NotFoundException();
      return await this.create(user)
    }

    async delete(token: string): Promise<DeleteResult>{
      return await this.tokenRepository.delete({ token })
    }

    async deleteAll(uId: number): Promise<DeleteResult>{
      return await this.tokenRepository.delete({ uId });
    }

    async exists(uId: number, token: string): Promise<Boolean>{
      const tokenData = await this.tokenRepository.findOne({ uId, token });
      return !!tokenData;
    }
}