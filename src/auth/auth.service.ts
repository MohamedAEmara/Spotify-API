import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ArtistsService } from 'src/artists/artists.service';
import { Enable2FAType, PayloadType } from './auth.types';
import * as speakeasy from 'speakeasy';
import { UpdateResult } from 'typeorm';
import { User } from 'src/users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private artistService: ArtistsService,
  ) {}

  async login(
    loginDTO: LoginDTO,
  ): Promise<
    { accessToken: string } | { validate2FA: string; message: string }
  > {
    // 1- Get user by email
    const user = await this.userService.findOne(loginDTO);

    // 2- Copmpare passwords
    const mathcedPassword = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );
    if (mathcedPassword) {
      delete user.password;
      const payload: PayloadType = { email: user.email, userId: user.id };
      // Find if it is an artist. then add the artist id to payload
      const artist = await this.artistService.findArtist(user.id);
      if (artist) {
        payload.artistId = artist.id;
      }
      // If validate2FA is enabled  =>  Send validateToken request link
      // Otherwise                  =>  Send the jwt in response.
      payload.validate2FA = true;
      if (user.enable2FA && user.twoFASecret) {
        payload.validate2FA = false;
      }
      return {
        accessToken: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException('Wrong email or password');
    }
  }

  async enable2FA(userId: number): Promise<Enable2FAType> {
    const user = await this.userService.findById(userId);
    if (user.enable2FA) {
      return { secret: user.twoFASecret };
    }
    const secret = speakeasy.generateSecret();
    console.log(secret);
    user.twoFASecret = secret.base32;
    await this.userService.updateSecretKey(user.id, user.twoFASecret);
    return { secret: user.twoFASecret };
  }

  async validate2FAToken(
    userId: number,
    token: string,
  ): Promise<{ accessToken: string; verified: boolean }> {
    try {
      const user = await this.userService.findById(userId);
      const verified = speakeasy.totp.verify({
        secret: user.twoFASecret,
        token,
        encoding: 'base32',
      });

      if (verified) {
        // update payload to make validate2FA true
        const payload: PayloadType = {
          email: user.email,
          userId: user.id,
          validate2FA: true,
        };

        return { accessToken: this.jwtService.sign(payload), verified: true };
      } else {
        return { accessToken: '', verified: false };
      }
    } catch (err) {
      throw new UnauthorizedException('Error verifying token!');
    }
  }

  async disable2FA(userId: number): Promise<UpdateResult> {
    return this.userService.disable2FA(userId);
  }

  async validateUserByApiKey(apiKey: string): Promise<User> {
    return this.userService.findByApiKey(apiKey);
  }
}
