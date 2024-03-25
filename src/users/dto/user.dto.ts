import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  nickname: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
