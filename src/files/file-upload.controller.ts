import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { BufferedFile } from 'src/common/minio/model/file.model';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class FileUploadController {
  constructor(private fileUploadService: FileUploadService) {}

  @Post('/file')
  @UseInterceptors(FileInterceptor('image'))
  async uploadSingleImage(@UploadedFile() image: BufferedFile) {
    return await this.fileUploadService.uploadSingleFile(image);
  }
}
