import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CheckNicknameDto {
  @ApiProperty()
  @IsString()
  nickname: string;
}
