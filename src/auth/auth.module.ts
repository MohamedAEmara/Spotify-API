import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule], // We have to import UserModule because we're using user controller inside auth controller
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService], // We can inject authService into appModule
})
export class AuthModule {}
