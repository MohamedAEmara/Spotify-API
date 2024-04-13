import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from 'src/common/constants/conneection';
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
  controllers: [SongsController],
  providers: [
    SongsService,
    // {
    //   provide: SongsService,
    //   useValue: mockSongsService    // Constant value for (SongsService)
    // }
    {
      provide: 'CONNECTION',
      useValue: connection,
    },
  ],
})
export class SongsModule {}
