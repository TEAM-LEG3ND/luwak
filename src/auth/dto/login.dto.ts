import { ApiProperty } from '@nestjs/swagger';

export class LogInDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
