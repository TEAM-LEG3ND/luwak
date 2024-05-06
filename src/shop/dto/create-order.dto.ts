import { ApiProperty } from '@nestjs/swagger';
import { OrderType } from 'src/common/domain/order-type';

export class CreateOrderDto {
  @ApiProperty()
  ingredientIds: string[];

  @ApiProperty({ type: 'enum', enum: OrderType, example: 'TO_GO' })
  type: OrderType;
}
