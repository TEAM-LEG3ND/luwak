import { Module } from '@nestjs/common';
import { MinioClientService } from './minio.client.service';

@Module({
  imports: [],
  providers: [MinioClientService],
  exports: [MinioClientService],
})
export class MinioClientModule {}
