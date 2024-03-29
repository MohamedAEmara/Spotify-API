import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Post()
  createSong() {
    return this.songsService.create('Rayek by Hamza Namira');
  }

  @Get()
  findAll() {
    return this.songsService.findAll();
  }

  @Get(':id')
  findOne() {
    return 'Get single song ...';
  }

  @Put(':id')
  updateSong() {
    return 'Update song by ID';
  }

  @Delete(':id')
  deleteSong() {
    return 'Delete song by ID';
  }
}
