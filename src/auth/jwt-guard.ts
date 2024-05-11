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
    return super.canActivate(context);
  }
  handleRequest<TUser = any>(err: any, user: any): TUser {
    // Logic goes here.....
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    // console.log(user);
    if (user.validate2FA) {
      return user;
    }

    throw err || new UnauthorizedException();
  }
}
