import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { BaseEntity } from 'src/common/base.entity';
import { Payment } from './payment.entity';

@Entity()
export class Cancel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '결제 취소한 금액' })
  cancelAmount: number;

  @Column({ comment: '결제 취소 이유' })
  cancelReason: string;

  @Column({ comment: '결제 취소 후 환불 가능한 잔액' })
  refundableAmount: number;

  @CreateDateColumn({ type: 'varchar', comment: '결제 취소된 날짜 시간 정보 ISO 8601 형식 2022-01-01T00:00:00+09:00' })
  canceledAt: string;

  @Column({ comment: '취소 거래의 키 값. 여러 건의 취소를 구분하기 위해 사용.' })
  transactionKey: string;

  @Column({ comment: '취소 건의 영수증 키 값' })
  receiptKey: string;

  @ManyToOne(() => Payment, (payment) => payment.cancels)
  payment: Payment;

  constructor(cancelAmount: number, cancelReason: string, refundableAmount: number, payment: Payment) {
    super();
    this.cancelAmount = cancelAmount;
    this.cancelReason = cancelReason;
    this.refundableAmount = refundableAmount;
    this.payment = payment;
  }
}
