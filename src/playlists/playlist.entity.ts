import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('playlists')
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Create a RELATIONSHIP between (songs) & (users)
  @OneToMany(() => Song, (song) => song.playlist)
  songs: Song[];

  // Many Playlists can belong to a single unique User.
  @ManyToOne(() => User, (user) => user.playlists)
  user: User;
}
