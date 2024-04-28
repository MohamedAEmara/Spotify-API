import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { FileUploadDto } from '../dto/file-upload.dto';

// @Injectable()
// export class FileSizeValidationPipe implements PipeTransform {
//   transform(
//     value: FileUploadDto,
//     metadata: ArgumentMetadata,
//   ) {
//     const oneKb = 1;
//     console.log('File size = ' + value.file);
//     console.log(metadata);
//     // console.log(file);
//     console.log(value.file);
//     if (value.file && value.file.size > oneKb) {
//       throw new BadRequestException('File size exceeds the allowed limit');
//     }
//     return value;
//   }
// }

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // "value" is an object containing the file's attributes and metadata
    const oneKb = 1000;
    return value.size < oneKb;
  }
}
