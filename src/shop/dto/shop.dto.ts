import { Point } from 'typeorm';
import { IngredientDto } from './ingredient.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ShopDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  location: Point;

  @ApiProperty()
  ingredients: IngredientDto[];
}
