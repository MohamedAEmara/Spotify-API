import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { DevConfigService } from './common/providers/DevConfigService';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { typeOrmAsyncConfig } from 'db/data-source';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { validate } from 'env.validation';

const devConfig = { port: 8080 };
const prodConfig = { port: 8082 };

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: [`${process.cwd()}/.env.${process.env.NODE_ENV}`],
      envFilePath: [`.env.${process.env.NODE_ENV}`],
      isGlobal: true, // to be able to use env variables without importing it in every single module
      load: [configuration],
      validate: validate,
    }),
    SongsModule,
    // TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    AuthModule,
    UsersModule,
    ArtistsModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: DevConfigService,
      useClass: DevConfigService,
    },
    {
      provide: 'CONFIG',
      useFactory: () => {
        return process.env.NODE_ENV === 'development' ? devConfig : prodConfig;
      },
    },
  ],
})
export class AppModule {}
