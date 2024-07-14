import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderIngredientDto {
  @ApiProperty({ type: 'string', description: '재료 id' })
  ingredientId: string;

  @ApiProperty({ type: 'number', description: '재료 수량' })
  quantity: number;
}
