import { ApiProperty } from '@nestjs/swagger';

export class CheckNicknameDto {
  @ApiProperty()
  nickname: string;
}
