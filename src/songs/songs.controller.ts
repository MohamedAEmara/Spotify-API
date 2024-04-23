import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  // HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song.dto';
import { Connection } from 'src/common/constants/conneection';
import { Song } from './song.entity';
import { UpdateSongDTO } from './dto/update-song.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ArtistJwtGuard } from 'src/auth/artist-jwt-guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('songs')
export class SongsController {
  constructor(
    private songsService: SongsService,
    @Inject('CONNECTION') private connection: Connection,
  ) {
    console.log(`Connection String: ${this.connection.CONNECTION_STRING}`);
  }

  @Post()
  @UseGuards(ArtistJwtGuard)
  @ApiBearerAuth('JWT-auth')
  createSong(
    @Body() createSongDTO: CreateSongDTO,
    @Request()
    req,
  ): Promise<Song> {
    console.log('requested user: ' + req.user);
    return this.songsService.create(createSongDTO);
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
}
