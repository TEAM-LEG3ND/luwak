import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  nickname: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
