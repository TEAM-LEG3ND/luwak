import { Module } from '@nestjs/common';
import { MinioClientModule } from 'src/common/minio/minio.client.module';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';

@Module({
  imports: [MinioClientModule],
  providers: [FileUploadService],
  controllers: [FileUploadController],
})
export class FileUploadModule {}
