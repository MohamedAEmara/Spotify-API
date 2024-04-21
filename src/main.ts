import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SeedService } from './seed/seed.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Use seedService (Enable to create fake initial data)
  /*
    const seedService = app.get(SeedService);
    await seedService.seed();
  */

  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('port'));
  // await app.listen(parseInt(process.env.PORT));
}
bootstrap();
