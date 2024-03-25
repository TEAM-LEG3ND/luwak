import { ApiProperty } from '@nestjs/swagger';
export class SignUpDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  nickname: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
