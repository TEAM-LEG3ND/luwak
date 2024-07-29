import { ApiProperty } from '@nestjs/swagger';
import { Ingredient } from './ingredient.entity';
import { IngredientDto } from '../dto/ingredient.dto';

export class OrderIngredient {
  @ApiProperty({ type: IngredientDto, description: '재료 상세' })
  ingredient: Ingredient;

  @ApiProperty({ type: 'number', description: '재료 개수' })
  quantity: number;
}
