import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class FileService {
  renameFile(oldPath: string, newPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.rename(oldPath, newPath, (error) => {
        if (error) {
          console.error('Error renaming file:', error);
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}
