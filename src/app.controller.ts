import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard) // This guard function (middleware) will run before "getProfile()"
  @ApiBearerAuth('JWT-auth') // Tell Swagger it's a protected route.
  getProfile(
    @Req()
    request,
  ) {
    return request.user;
  }
}
