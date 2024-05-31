import { ApiProperty } from '@nestjs/swagger';
import { OrderType } from 'src/common/domain/order-type';
import { Ingredient } from '../entity/ingredient.entity';
import { Order } from '../entity/order.entity';

export class OrderDto {
  @ApiProperty()
  orderId: string;

  @ApiProperty({ type: 'enum', enum: OrderType, example: 'TO_GO', description: '주문 타입' })
  type: OrderType;

  @ApiProperty({ type: BigInt, description: '주문 총 금액' })
  priceSum: BigInt;

  @ApiProperty({ type: Ingredient, description: '주문에 포함된 재료 목록' })
  ingredients: Ingredient[];

  @ApiProperty({ type: 'number', description: '주문 매장 id' })
  shopId: number;

  static fromEntity(entity: Order): OrderDto {
    const dto = new OrderDto();
    dto.orderId = entity.id;
    dto.type = entity.type;
    dto.priceSum = entity.priceSum;
    dto.shopId = entity.shopId;
    dto.ingredients = entity.ingredients;
    return dto;
  }
}
