import { Entity, Column, Unique, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'src/common/base.entity';

import { Cancel } from './cancel.entity';

import { PaymentType } from './payment.enum';

@Entity()
@Unique(['paymentKey', 'orderId'])
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  paymentKey: string;

  @Column()
  // 총 금액으로 결제가 취소되거나 부분 취소되어도 유지
  totalAmount: number;

  @Column({ type: 'enum', name: 'payment_type', enum: PaymentType })
  // [일반 결제, 간편 결제, 브랜드 페이]
  type: PaymentType;

  @Column()
  // 주문 ID
  orderId: string;

  @OneToMany(() => Cancel, (cancel) => cancel.payment)
  // 취소 객체
  cancels: Cancel[];
}
