import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Playlist } from 'src/playlists/playlist.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Mohamed',
    description: 'provide the firstName of the user',
  })
  @Column()
  firstName: string;

  @ApiProperty({
    example: 'Ahmed',
    description: 'provide the lastName of the user',
  })
  @Column()
  lastName: string;

  @ApiProperty({
    example: 'example@user.com',
    description: 'provide the email of the user',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: 'pass123#$',
    description: 'provide the password of the user',
  })
  @Column()
  @Exclude() // Don't send password in Response.
  password: string;

  @Column({ nullable: true, type: 'text' })
  twoFASecret: string;

  @Column({ default: false, type: 'boolean' })
  enable2FA: boolean;

  @Column()
  apiKey: string;

  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playlists: Playlist[];
}
