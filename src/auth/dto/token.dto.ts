import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TokensDto {
  @ApiProperty()
  @IsString()
  readonly accessToken: string;
  @ApiProperty()
  @IsString()
  readonly refreshToken?: string;

  constructor(accessToken: string, refreshToken?: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}

export class NewAccessTokenDto {
  @ApiProperty()
  @IsString()
  newAccessToken: string;

  constructor(newAccessToken: string) {
    this.newAccessToken = newAccessToken;
  }
}

export class RefreshTokenDto {
  @ApiProperty()
  @IsString()
  refreshToken: string;

  constructor(refreshToken: string) {
    this.refreshToken = refreshToken;
  }
}
