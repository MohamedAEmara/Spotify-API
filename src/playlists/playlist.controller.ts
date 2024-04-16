import { Body, Controller, Post } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDTO } from './dto/playlist.dto';
import { Playlist } from './playlist.entity';

@Controller('playlists')
export class PlaylistsController {
  constructor(private playlistService: PlaylistService) {}
  @Post()
  create(
    @Body()
    playlistDTO: CreatePlaylistDTO,
  ): Promise<Playlist> {
    return this.playlistService.create(playlistDTO);
  }
}
