import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Ingredient } from './ingredient.entity';
import { OrderStatus } from 'src/common/domain/order-status';
import { OrderType } from 'src/common/domain/order-type';
import { SizeType } from 'src/common/domain/size-type';
import { PackageType } from 'src/common/domain/package-type';
import { TemperatureType } from 'src/common/domain/temperature-type';

@Entity({ name: 'orders' })
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'int' })
  shopId: number;

  @Column({ type: 'bigint' })
  priceSum: BigInt;

  @Column({ type: 'enum', enum: SizeType })
  size: SizeType;

  @Column({ type: 'enum', enum: TemperatureType })
  temperature: TemperatureType;

  @Column({ type: 'json' })
  ingredients: Ingredient[];

  @Column({ type: 'enum', enum: OrderStatus })
  status: OrderStatus;

  @Column({ type: 'enum', enum: OrderType })
  package: PackageType;
}
