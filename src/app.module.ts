import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { DevConfigService } from './common/providers/DevConfigService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './songs/song.entity';
import { User } from './users/users.entity';
import { Playlist } from './playlists/playlist.entity';
import { Artist } from './artists/artist.entity';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { dataSourceOptions } from 'db/data-source';

const devConfig = { port: 8080 };
const prodConfig = { port: 8082 };

@Module({
  imports: [
    SongsModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    UsersModule,
    ArtistsModule,
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
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {
    console.log('Database.....');
    console.log(dataSource.driver.database);
  }
  configure(consumer: MiddlewareConsumer) {
    // 1- Apply middleware for all requests from route 'songs'
    consumer.apply(LoggerMiddleware).forRoutes('songs');

    // 2- Apply middleware for POST requests from route 'songs'
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'songs', method: RequestMethod.POST });

    // 3- Apply middleware for request from a controller file:
    consumer.apply(LoggerMiddleware).forRoutes(SongsController);
  }
}
