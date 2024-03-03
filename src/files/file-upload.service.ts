import { Injectable } from '@nestjs/common';
import { MinioClientService } from 'src/common/minio/minio.client.service';
import { BufferedFile } from 'src/common/minio/model/file.model';

@Injectable()
export class FileUploadService {
  constructor(private minioClientService: MinioClientService) {}

  async uploadSingleFile(image: BufferedFile) {
    const uploadedImage = await this.minioClientService.upload(image);
    return {
      url: uploadedImage.url,
    };
  }
}
