import { ApiProperty } from '@nestjs/swagger';
import { Ingredient } from '../entity/ingredient.entity';

export class IngredientDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ description: '재료 이름' })
  name: string;

  @ApiProperty({ description: '재료 단일 가격' })
  price: number;

  @ApiProperty({ description: '재료 상세 설명' })
  description: string;

  @ApiProperty({ description: '재료 썸네일 url' })
  thumbnail: string;

  @ApiProperty({ description: '재료 태그' })
  tags: string[];

  static fromEntity(entity: Ingredient): IngredientDto {
    const dto = new IngredientDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.price = entity.price;
    dto.description = entity.description;
    dto.thumbnail = entity.thumbnail;
    dto.tags = entity.tags;
    return dto;
  }
}
