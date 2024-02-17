export class AccessTokenDto {
  readonly token: string;

  constructor(token: string) {
    this.token = token;
  }
}
