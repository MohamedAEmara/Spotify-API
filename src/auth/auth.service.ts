import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ArtistsService } from 'src/artists/artists.service';
import { PayloadType } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private artistService: ArtistsService,
  ) {}

  async login(loginDTO: LoginDTO): Promise<{ accessToken: string }> {
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
      return {
        accessToken: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException('Wrong email or password');
    }
  }
}
