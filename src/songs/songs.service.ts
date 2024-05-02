import { Injectable } from '@nestjs/common';
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
import { CreateSongWithFileDTO } from './dto/create-song-with-file.dto';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}
  async create(
    songDTO: Pick<
      CreateSongWithFileDTO,
      'lyrics' | 'releasedDate' | 'title' | 'artists'
    >,
    filePath: string,
    duration: number,
  ): Promise<Song> {
    const song = new Song();
    song.title = songDTO.title;
    song.lyrics = songDTO.lyrics;
    song.releasedDate = songDTO.releasedDate;
    song.track = `./${filePath}.mp3`;
    song.duration = duration;

    // Find all the artists based on IDs
    const str = songDTO.artists.toString();
    const arr = str.split(',');
    const ids = arr.map((el) => Number(el));

    const artists = await this.artistRepository.findByIds(ids);

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
