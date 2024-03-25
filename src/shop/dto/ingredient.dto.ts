import { ApiProperty } from '@nestjs/swagger';

export class IngredientDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  thumbnail: string;
}
