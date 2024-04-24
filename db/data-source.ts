import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { Artist } from 'src/artists/artist.entity';
import { Playlist } from 'src/playlists/playlist.entity';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/users.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // entities: ['dist/**/*.entity.js'],
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
      host: configService.get<string>('dbHost'),
      port: configService.get<number>('dbPort'),
      username: configService.get<string>('dbUsername'),
      database: configService.get<string>('dbName'),
      password: configService.get<string>('dbPassword'),
      // entities: ['dist/**/*.entity.js'],
      entities: [User, Song, Playlist, Artist],
      synchronize: true,
      migrations: ['dist/db/migrations/*.js'],
    };
    console.log(test);
    return {
      type: 'postgres',
      host: configService.get<string>('dbHost'),
      port: configService.get<number>('dbPort'),
      username: configService.get<string>('dbUsername'),
      database: configService.get<string>('dbName'),
      password: configService.get<string>('dbPassword'),
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
      migrations: ['dist/db/migrations/*.js'],
    };
  },
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
