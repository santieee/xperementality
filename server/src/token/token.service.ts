import { Injectable, NotFoundException } from '@nestjs/common';
import { TokenRepository } from './token.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './token.entity'
import { JwtService } from '@nestjs/jwt';
import { DeleteResult } from 'typeorm';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';

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

    async create(createTokenDto: CreateTokenDto): Promise<Object>{
      const payload = { username: createTokenDto.username, id: createTokenDto.id };
      const token = this.jwtService.sign(payload, { expiresIn: '1d' });
      let userToken = new Token();
      userToken.token = token;
      userToken.uId = createTokenDto.id;
      userToken.fingerPrint = JSON.stringify(createTokenDto.fingerPrint);
      userToken.refreshToken = this.jwtService.sign(payload, { expiresIn: '60d' });
      const result = await userToken.save();
      return { 
        token: result.token, 
        refreshToken: result.refreshToken,
        id: createTokenDto.id, 
        username: createTokenDto.username 
      }
    }

    async refresh(updateTokenDto: UpdateTokenDto): Promise<Object>{
      const oldToken = await this.tokenRepository.findOne({ refreshToken: updateTokenDto.refreshToken });
      if(!oldToken) return new NotFoundException();
      const isValidFingrPrint = oldToken.fingerPrint == JSON.stringify(updateTokenDto.fingerPrint);
      oldToken.remove()
      if(!isValidFingrPrint) return new NotFoundException();
      return await this.create(updateTokenDto)
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