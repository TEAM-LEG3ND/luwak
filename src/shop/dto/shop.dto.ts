import { Point } from 'typeorm';
import { IngredientDto } from './ingredient.dto';

export class ShopDto {
  id: number;

  name: string;

  description: string;

  location: Point;

  ingredients: IngredientDto[];
}
