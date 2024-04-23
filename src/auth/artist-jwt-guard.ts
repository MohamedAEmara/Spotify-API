import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class ArtistJwtGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest<TUser = any>(err: any, user: any): TUser {
    // Logic goes here.....
    console.log('UUUUUUUUUUUUUUSSSSSSSSSSSSSSSEEEEEEEEEEEEEEEERRRRRRRRRRR');
    console.log(user);
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    if (user.artistId) {
      return user;
    }

    throw err || new UnauthorizedException();
  }
}
