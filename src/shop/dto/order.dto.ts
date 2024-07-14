import { ApiProperty } from '@nestjs/swagger';
import { PackageType } from 'src/common/domain/package-type';
import { Ingredient } from '../entity/ingredient.entity';
import { Order } from '../entity/order.entity';
import { SizeType } from 'src/common/domain/size-type';
import { TemperatureType } from 'src/common/domain/temperature-type';

export class OrderDto {
  @ApiProperty()
  orderId: string;

  @ApiProperty({ type: 'enum', enum: PackageType, example: 'TO_GO', description: '포장 타입' })
  packageType: PackageType;

  @ApiProperty({ type: 'enum', enum: SizeType, example: 'MEDIUM', description: '사이즈' })
  sizeType: SizeType;

  @ApiProperty({ type: 'enum', enum: TemperatureType, example: 'ICE', description: '음료 온도 타입' })
  temperatureType: TemperatureType;

  @ApiProperty({ type: 'string', description: '주문 총 금액' })
  priceSum: string;

  @ApiProperty({ type: Ingredient, description: '주문에 포함된 재료 목록' })
  ingredients: Ingredient[];

  @ApiProperty({ type: 'number', description: '주문 매장 id' })
  shopId: number;

  @ApiProperty({ type: Date, description: '주문 생성 일시' })
  createdDate: Date;

  static fromEntity(entity: Order): OrderDto {
    const dto = new OrderDto();
    dto.orderId = entity.id;
    dto.packageType = entity.package;
    dto.sizeType = entity.size;
    dto.temperatureType = entity.temperature;
    dto.priceSum = entity.priceSum;
    dto.shopId = entity.shopId;
    dto.ingredients = entity.ingredients;
    dto.createdDate = entity.created_at;
    return dto;
  }
}
