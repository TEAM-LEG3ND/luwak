import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, Unique } from 'typeorm';

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

  @Column()
  // 취소할 수 있는 금액
  balanceAmount: number;

  @Column()
  // [일반 결제, 간편 결제, 브랜드 페이]
  type: string;

  @Column()
  // 주문 ID
  orderId: string;

  @Column()
  // 주문 제목 (우유 1개, 에스프레소 1개 외 2건 등)
  orderName: string;

  @Column()
  // 상점 ID (광교도리점)
  mId: string;

  @Column({ type: 'jsonb' })
  // 취소 객체
  cancels: object[];

  @Column()
  // 상태
  status: string;
}
