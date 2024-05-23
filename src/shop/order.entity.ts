import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Ingredient } from './ingredient.entity';

@Entity({ name: 'orders' })
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") 
  id: string;

  @Column({ type: 'bigint' })
  priceSum: BigInt;

  @Column({ type: 'json' })
  ingredients: Ingredient[];
}
