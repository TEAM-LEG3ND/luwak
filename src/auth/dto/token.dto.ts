import { ApiProperty } from '@nestjs/swagger';

export class TokensDto {
  @ApiProperty()
  readonly accessToken: string;
  @ApiProperty()
  readonly refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}

export class NewAccessTokenDto {
  @ApiProperty()
  newAccessToken: string;

  constructor(newAccessToken: string) {
    this.newAccessToken = newAccessToken;
  }
}

export class RefreshTokenDto {
  @ApiProperty()
  refreshToken: string;

  constructor(refreshToken: string) {
    this.refreshToken = refreshToken;
  }
}
