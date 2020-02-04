import { Injectable, NestInterceptor, CallHandler, Res, ArgumentsHost } from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class UnSetCookieInterceptor implements NestInterceptor {
  intercept(
    context: ArgumentsHost,
    next: CallHandler,
  ): Observable<CallHandler> {
    return next
      .handle()
      .pipe(
        tap( data => {
          let req = context.switchToHttp().getRequest();
          const maxAge = -1;
          req.res.header('Set-Cookie', `_h=0;Path=/;HttpOnly;Max-Age=${maxAge}`);
          return data;
        }),
      );
  }
}