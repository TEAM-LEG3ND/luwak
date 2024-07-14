import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OrderStatus } from 'src/common/domain/order-status';
import { SizeType } from 'src/common/domain/size-type';
import { PackageType } from 'src/common/domain/package-type';
import { TemperatureType } from 'src/common/domain/temperature-type';
import { OrderIngredient } from './order-ingredient.entity';

@Entity({ name: 'orders' })
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'int' })
  shopId: number;

  @Column({ type: 'bigint' })
  priceSum: string;

  @Column({ type: 'enum', enum: SizeType })
  size: SizeType;

  @Column({ type: 'enum', enum: TemperatureType })
  temperature: TemperatureType;

  @Column({ type: 'json' })
  ingredients: OrderIngredient[];

  @Column({ type: 'enum', enum: OrderStatus })
  status: OrderStatus;

  @Column({ type: 'enum', enum: PackageType })
  package: PackageType;
}
