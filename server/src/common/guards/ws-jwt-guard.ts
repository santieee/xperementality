import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService
  ) {}

  canActivate(context: ExecutionContext): boolean{
    const client = context.switchToWs().getClient();
    const { token } = JSON.parse(client.handshake.query.profile);
    this.jwtService.verify(token)
    return true;
  }
}