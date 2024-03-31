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

@Module({
  imports: [SongsModule],
  controllers: [AppController],
  providers: [AppService],
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
