import { Injectable } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { BufferedFile } from './model/file.model';
import { MinioUploadResult } from './model/upload.model';

@Injectable()
export class MinioClientService {
  private readonly DEFAULT_BUCKET: string = 'luwak';
  constructor(private readonly minio: MinioService) {}

  public async upload(file: BufferedFile, targetBucket: string = this.DEFAULT_BUCKET): Promise<MinioUploadResult> {
    return new MinioUploadResult();
  }

  public async delete(): Promise<void> {
    return;
  }
}
