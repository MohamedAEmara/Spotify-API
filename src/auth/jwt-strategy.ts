import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
// import { authConstants } from './auth.constants';
import { PayloadType } from './auth.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
    });
  }

  async validate(payload: PayloadType): Promise<PayloadType> {
    return {
      userId: payload.userId,
      email: payload.email,
      validate2FA: payload.validate2FA,
      enable2FA: payload.enable2FA,
      artistId: payload.artistId,
    };
  }
}
