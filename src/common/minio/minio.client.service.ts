import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { BufferedFile } from './model/file.model';
import { MinioUploadResult } from './model/upload.model';
import * as crypto from 'crypto';

@Injectable()
export class MinioClientService {
  private readonly DEFAULT_BUCKET: string = 'luwak';
  constructor(private readonly minio: MinioService) {}

  public async upload(file: BufferedFile, targetBucket: string = this.DEFAULT_BUCKET): Promise<MinioUploadResult> {
    if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
      throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
    }
    let temp_filename = Date.now().toString();
    let hashedFileName = crypto.createHash('md5').update(temp_filename).digest('hex');
    let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    const metaData = {
      'Content-Type': file.mimetype,
    };
    let filename = hashedFileName + ext;
    const fileName: string = `${filename}`;
    const fileBuffer = file.buffer;
    this.client.putObject(targetBucket, fileName, fileBuffer, function (err, res) {
      if (err) throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
    });

    return {
      url: `${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${targetBucket}/${filename}`,
    };
  }

  private get client() {
    return this.minio.client;
  }

  public async delete(objectName: string, targetBucket: string = this.DEFAULT_BUCKET): Promise<void> {
    return await this.client.removeObject(targetBucket, objectName);
  }
}
