import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from 'src/common/constants/conneection';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { Artist } from 'src/artists/artist.entity';
import { MulterModule } from '@nestjs/platform-express';
import { AudioService } from '../common/providers/audio.service';
import { FileService } from '../common/providers/file.service';
// const mockSongsService = {
//   findAll() {
//     return [
//       {
//         id: 1,
//         title: "Don't be sad",
//         artists: ['Samy Yusuf'],
//         releaseDate: '2022-09-29',
//         duration: '02:34',
//       },
//     ];
//     // return [{ id: 1, title: "Don't be sad" }]
//   },
// };

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './uploads',
      }),
    }),
    TypeOrmModule.forFeature([Song, Artist]),
  ], // Now we can use artistRepository into songService
  // Now we can inject songRepository into songService
  controllers: [SongsController],
  providers: [
    SongsService,
    AudioService,
    FileService,
    {
      provide: 'CONNECTION',
      useValue: connection,
    },
  ],
})
export class SongsModule {}
