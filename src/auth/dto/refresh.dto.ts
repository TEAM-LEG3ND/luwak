import { ApiProperty } from '@nestjs/swagger';

export class RefreshDto {
  @ApiProperty()
  readonly oldRefreshToken: string;
}
