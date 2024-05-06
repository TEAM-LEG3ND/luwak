import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Ingredient } from './ingredient.entity';
import { OrderType } from 'src/common/domain/order-type';

@Entity({ name: 'orders' })
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  priceSum: BigInt;

  @Column({ type: 'json' })
  ingredients: Ingredient[];

  @Column({ type: 'enum', enum: OrderType })
  type: OrderType;
}
