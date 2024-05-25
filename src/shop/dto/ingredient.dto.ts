import { ApiProperty } from '@nestjs/swagger';
import { Ingredient } from '../entity/ingredient.entity';

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

  static fromEntity(entity: Ingredient): IngredientDto {
    const dto = new IngredientDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.price = entity.price;
    dto.description = entity.description;
    dto.thumbnail = entity.thumbnail;
    return dto;
  }
}
