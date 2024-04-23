import { Injectable } from '@nestjs/common';
import { CreateSongDTO } from './dto/create-song.dto';
import { Repository, UpdateResult } from 'typeorm';
import { Song } from './song.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateSongDTO } from './dto/update-song.dto';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artists/artist.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}
  async create(songDTO: CreateSongDTO): Promise<Song> {
    const song = new Song();
    song.title = songDTO.title;
    song.artists = songDTO.artists;
    song.duration = songDTO.duration;
    song.lyrics = songDTO.lyrics;
    song.releasedDate = songDTO.releaseDate;

    // Find all the artists based on IDs
    const artists = await this.artistRepository.findByIds(songDTO.artists);
    // Set the relation with artist and songs
    song.artists = artists;
    // Finally, we can call save() method from songsRepository
    return await this.songsRepository.save(song);
  }

  async findAll(): Promise<Song[]> {
    return await this.songsRepository.find();
  }

  async findOne(id: number): Promise<Song> {
    return await this.songsRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    const song = await this.songsRepository.findOneBy({ id });
    if (!song) {
      throw new Error('There is no song with this ID!');
    } else {
      await this.songsRepository.delete({ id });
    }
  }

  async update(
    id: number,
    fieldsToUpdate: UpdateSongDTO,
  ): Promise<UpdateResult> {
    return this.songsRepository.update(id, fieldsToUpdate);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = this.songsRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.releasedDate', 'DESC');
    return paginate<Song>(queryBuilder, options);
  }
}
