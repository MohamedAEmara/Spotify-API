import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateSongWithFileDTO {
  @ApiProperty({
    description: 'Name of the song',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Released Date',
    type: Date,
  })
  @IsDate()
  @IsNotEmpty()
  releasedDate: Date;

  @ApiProperty({
    description: 'Copy song lyrics here',
    required: false,
  })
  @IsString()
  lyrics: string;

  @ApiProperty({
    description: 'Playlist',
    required: false,
  })
  @IsString()
  playlist: string;

  @ApiProperty({
    description: 'Audio file of the song',
    type: 'string',
    format: 'binary',
  })
  file: any;

  @ApiProperty({
    description: 'Artists',
    type: Array,
  })
  artists: string[];
}
