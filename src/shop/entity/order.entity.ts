import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Ingredient } from './ingredient.entity';
import { OrderStatus } from 'src/common/domain/order-status';
import { OrderType } from 'src/common/domain/order-type';

@Entity({ name: 'orders' })
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'int' })
  shopId: number;

  @Column({ type: 'bigint' })
  priceSum: BigInt;

  @Column({ type: 'json' })
  ingredients: Ingredient[];

  @Column({ type: 'enum', enum: OrderStatus })
  status: OrderStatus;

  @Column({ type: 'enum', enum: OrderType })
  type: OrderType;
}
