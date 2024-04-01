import { Injectable } from '@nestjs/common';
import { CreateSongDTO } from './dto/create-song-dto';

@Injectable()
export class SongsService {
  // For now, we'll create an array to store songs.
  // Later we'll provide a real DB.

  private readonly songs = [];

  create(song: CreateSongDTO) {
    this.songs.push(song);
    return this.songs;
  }

  findAll() {
    return this.songs;
  }
}
