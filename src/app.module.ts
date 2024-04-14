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
import { User } from './users/user.entity';
import { Playlist } from './playlists/playlist.entity';
import { Artist } from './artists/artist.entity';

const devConfig = { port: 3000 };
const prodConfig = { port: 4000 };

@Module({
  imports: [
    SongsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'spotify',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      entities: [Song, User, Playlist, Artist],
      synchronize: true,
    }),
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
