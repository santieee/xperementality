import { Injectable, NestInterceptor, CallHandler, Res, ArgumentsHost } from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class SetCookieInterceptor implements NestInterceptor {
  intercept(
    context: ArgumentsHost,
    next: CallHandler,
  ): Observable<CallHandler> {
    return next
      .handle()
      .pipe(
        tap( data => {
          let req = context.switchToHttp().getRequest();
          const maxAge = 60 * 60 * 24 * 60;
          req.res.header('Set-Cookie', `_h=${JSON.stringify({ token: data.token, refreshToken: data.refreshToken })};Path=/;HttpOnly;Max-Age=${maxAge}`);
          return data;
        }),
      );
  }
}