import { Injectable } from '@nestjs/common';
import * as mm from 'music-metadata';

@Injectable()
export class AudioService {
  async getDuration(filePath: string): Promise<number> {
    try {
      const metadata = await mm.parseFile(filePath, { duration: true });
      return metadata.format.duration || 0;
    } catch (error) {
      // Handle error, for example if file is not found or not a valid audio file
      console.error('Error extracting duration:', error);
      return 0;
    }
  }
}
