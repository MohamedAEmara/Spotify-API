import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
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
      const payload = { email: user.email, sub: user.id };
      return {
        accessToken: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException('Wrong email or password');
    }
  }
}
