import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
  // For now, we'll create an array to store songs.
  // Later we'll provide a real DB.

  private readonly songs = [];

  create(song) {
    this.songs.push(song);
    return this.songs;
  }

  findAll() {
    throw new Error(
      'Error in DB while fetching the songs. Please try again later.',
    );
  }
}
