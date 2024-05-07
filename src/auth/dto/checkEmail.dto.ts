import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CheckEmailDto {
  @ApiProperty()
  @IsString()
  email: string;
}
