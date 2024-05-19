import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // console.log('JwtAuthGuard');
    // console.log(context.switchToHttp().getRequest().headers.authorization);
    return super.canActivate(context);
  }
  handleRequest<TUser = any>(err: any, user: any): TUser {
    // Logic goes here.....
    // console.log('err', err);
    // console.log('user', user);
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    if (user.enable2FA) {
      if (user.validate2FA) {
        return user;
      }
      throw new UnauthorizedException('2FA is not valid');
    } else {
      return user;
    }
  }
}
