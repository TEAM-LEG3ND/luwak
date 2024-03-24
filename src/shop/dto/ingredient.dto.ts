import { ApiProperty } from '@nestjs/swagger';

export class IngredientDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  thumbnail: string;
}
