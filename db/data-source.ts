import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { Artist } from '../src/artists/artist.entity';
import { Playlist } from '../src/playlists/playlist.entity';
import { Song } from '../src/songs/song.entity';
import { User } from '../src/users/users.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [User, Song, Playlist, Artist],
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
};

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    const test = {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      // entities: ['dist/**/*.entity.js'],
      entities: [User, Song, Playlist, Artist],
      synchronize: true,
      migrations: ['dist/db/migrations/*.js'],
    };
    console.log(test);
    return {
      type: 'postgres',
      url: process.env.DATABASE_URL,
    };
  },
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
