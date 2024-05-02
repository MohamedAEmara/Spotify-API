import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateSongDTO {
  @IsString()
  @IsOptional()
  readonly title;

  @IsOptional()
  @IsArray()
  // @isString({}, { each: true })
  @IsString()
  readonly artists;

  @IsDateString()
  @IsOptional()
  readonly releasedDate: Date;

  // @IsMilitaryTime()
  @IsNumber()
  @IsOptional()
  readonly duration: number;

  @IsString()
  @IsOptional()
  readonly lyrics: string;

  @IsString()
  @IsOptional()
  readonly track: string;
}
