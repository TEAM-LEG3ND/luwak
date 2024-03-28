import { ApiProperty } from '@nestjs/swagger';

export class IngredientDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  thumbnail: string;
}
