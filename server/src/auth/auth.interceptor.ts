import { Injectable, NestInterceptor, CallHandler, Res, ArgumentsHost } from '@nestjs/common';
import { tap } from 'rxjs/operators';

@Injectable()
export class SetCookieInterceptor implements NestInterceptor {
  intercept(
    context: ArgumentsHost,
    next: CallHandler,
  ){
    return next
      .handle()
      .pipe(
        tap( data => {
          let req = context.switchToHttp().getRequest();
          req.res.header('Set-Cookie', `_h=${JSON.stringify({ token: data.token, tokenRefresh: data.tokenRefresh })};Path=/;HttpOnly`);
          return data;
        }),
      );
  }
}