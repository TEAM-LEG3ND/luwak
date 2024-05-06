import { ApiProperty } from '@nestjs/swagger';
import { OrderType } from 'src/common/domain/order-type';
import { Ingredient } from '../entity/ingredient.entity';
import { Order } from '../entity/order.entity';

export class OrderDto {
  @ApiProperty()
  orderId: number;

  @ApiProperty({ type: 'enum', enum: OrderType, example: 'TO_GO' })
  type: OrderType;

  @ApiProperty()
  priceSum: BigInt;

  @ApiProperty()
  ingredients: Ingredient[];

  static fromEntity(entity: Order): OrderDto {
    const dto = new OrderDto();
    dto.orderId = entity.id;
    dto.type = entity.type;
    dto.priceSum = entity.priceSum;
    dto.ingredients = entity.ingredients;
    return dto;
  }
}
