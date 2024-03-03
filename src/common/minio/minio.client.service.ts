import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BufferedFile } from './model/file.model';
import { MinioUploadResult } from './model/upload.model';
import * as crypto from 'crypto';
import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class MinioClientService {
  private readonly DEFAULT_BUCKET: string = 'luwak';
  private readonly SUPPORTED_FILE_EXT = new Set(['image']);
  private minioClient: S3Client;

  constructor() {
    this.minioClient = new S3Client({
      region: process.env.MINIO_REGION,
      credentials: {
        accessKeyId: process.env.MINIO_ACCESS_KEY,
        secretAccessKey: process.env.MINIO_SECRET_KEY,
      },
      endpoint: process.env.MINIO_ENDPOINT,
      forcePathStyle: true,
    });
  }

  public async upload(file: BufferedFile, targetBucket: string = this.DEFAULT_BUCKET): Promise<MinioUploadResult> {
    const lastSlashIndex = file.mimetype.lastIndexOf('/');
    const fileType = file.mimetype.slice(0, lastSlashIndex);
    const fileExt = file.mimetype.slice(lastSlashIndex + 1);
    console.log(fileType, fileExt);

    if (!this.SUPPORTED_FILE_EXT.has(fileType)) {
      throw new HttpException(
        `Not Supported MimeType: ${file.mimetype}, Only Supports ${[...this.SUPPORTED_FILE_EXT].join(', ')}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const tempFilename = Date.now().toString();
    const hashedFileName = crypto.createHash('md5').update(tempFilename).digest('hex');

    const uploadCommand = new PutObjectCommand({
      Bucket: targetBucket,
      Key: `${hashedFileName}.${fileExt}`,
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: file.mimetype,
    });

    return this.minioClient
      .send(uploadCommand)
      .then((result) => {
        console.log(result);
        return {
          url: `${targetBucket}/${hashedFileName}.${fileExt.toLowerCase()}`,
        };
      })
      .catch((error) => {
        console.error(error.$response);
        throw new HttpException('Error occurred during upload', HttpStatus.BAD_REQUEST);
      });
  }

  public async delete(objectName: string, targetBucket: string = this.DEFAULT_BUCKET): Promise<void> {
    const deleteCommand = new DeleteObjectCommand({
      Bucket: targetBucket,
      Key: objectName,
    });
    this.minioClient
      .send(deleteCommand)
      .then((result) => {
        console.log(`successfully deleted: ${objectName} with`, result);
      })
      .catch((error) => {
        console.error(error.$response);
      });
  }
}
