import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { User } from 'src/users/users.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async login(loginDTO: LoginDTO): Promise<User> {
    // 1- Get user by email
    const user = await this.userService.findOne(loginDTO);

    // 2- Copmpare passwords
    const mathcedPassword = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );
    if (mathcedPassword) {
      delete user.password;
      return user;
    } else {
      throw new UnauthorizedException('Wrong email or password');
    }
  }
}
