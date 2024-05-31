import { Point } from 'typeorm';
import { IngredientDto } from './ingredient.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Shop } from '../shop.entity';

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

  static fromEntity(entity: Shop): ShopDto {
    const dto = new ShopDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.description = entity.description;
    dto.location = entity.location;
    dto.ingredients = entity.ingredients;
    return dto;
  }
}
