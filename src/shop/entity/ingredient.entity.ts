import { ApiProperty } from '@nestjs/swagger';

export class Ingredient {
  @ApiProperty()
  id: string;

  @ApiProperty({ description: '재료 이름' })
  name: string;

  @ApiProperty({ description: '재료 설명' })
  description: string;

  @ApiProperty({ description: '재료 가격' })
  price: number;

  @ApiProperty({ description: '재료 썸네일' })
  thumbnail: string;
}
