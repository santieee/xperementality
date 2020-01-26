import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { TokenService } from '../token/token.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private tokenService: TokenService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
      secretOrKey: jwtConstants.secret,
    });
  }

  // async validate(payload: any, done: VerifiedCallback) {
  //   console.log(payload)
  //   if (!payload) {
  //     done(new UnauthorizedException(), false);
  //   }
  //   this.tokenService.find({ uId: payload.sub })
  //   return done(null, payload);
  // }
  async validate(req, user) {
    const token = req.headers.authorization.slice(7);
    const tokenExists = await this.tokenService.exists(user.id, token);
    if (tokenExists) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
}