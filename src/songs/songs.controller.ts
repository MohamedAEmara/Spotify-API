import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { Connection } from 'src/common/constants/conneection';
import { Song } from './song.entity';
import { UpdateSongDTO } from './dto/update-song.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateSongWithFileDTO } from './dto/create-song-with-file.dto';
import { AudioService } from '../common/providers/audio.service';
import { FileService } from '../common/providers/file.service';
import { JwtAuthGuard } from './../auth/jwt-guard';

@Controller('songs')
export class SongsController {
  constructor(
    private songsService: SongsService,
    private audioService: AudioService,
    private fileService: FileService,
    @Inject('CONNECTION') private connection: Connection,
  ) {
    console.log(`Connection String: ${this.connection.CONNECTION_STRING}`);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'track file',
    type: CreateSongWithFileDTO,
  })
  async createSong(
    @Body()
    createSongDTO: Pick<
      CreateSongWithFileDTO,
      'lyrics' | 'releasedDate' | 'title' | 'artists'
    >,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Song> {
    console.log('file');
    console.log(file);

    console.log(createSongDTO.artists);
    console.log(typeof createSongDTO.artists);
    console.log(createSongDTO.artists.length);

    let duration = 0;
    if (file.path) {
      duration = await this.audioService.getDuration(file.path);
      duration = Math.floor(duration);
      await this.fileService.renameFile(`./${file.path}`, `./${file.path}.mp3`);
    }
    console.log('duration of the file = ' + duration);
    const createdSong = await this.songsService.create(
      createSongDTO,
      file ? file.path : null,
      duration,
    );
    return createdSong;
  }

  // @Get()
  // findAll(): Promise<Song[]> {
  //   try {
  //     return this.songsService.findAll();
  //   } catch (e) {
  //     throw new HttpException(
  //       'server error',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //       {
  //         cause: e,
  //       },
  //     );
  //   }
  // }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit = 10,
  ): Promise<Pagination<Song>> {
    limit = limit > 100 ? 100 : limit;
    return this.songsService.paginate({
      page,
      limit,
    });
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Song> {
    console.log(typeof id);
    return this.songsService.findOne(id);
  }

  @Put(':id')
  updateSong(
    @Body() fieldsToUpdate: UpdateSongDTO,
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.songsService.update(id, fieldsToUpdate);
  }

  @Delete(':id')
  deleteSong(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<void> {
    return this.songsService.delete(id);
  }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    description: 'create new song',
    type: CreateSongWithFileDTO,
  })
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'audio' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
  }
}
