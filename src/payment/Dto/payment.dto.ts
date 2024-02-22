import { ApiProperty } from '@nestjs/swagger';
import { CancelDto } from './cancel.dto';
import { PaymentStatus, PaymentType } from '../payment.enum';
import { Payment } from '../payment.entity';

export class PaymentDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  paymentKey: string;

  @ApiProperty()
  totalAmount: number;

  @ApiProperty()
  balanceAmount: number;

  @ApiProperty()
  type: PaymentType;

  @ApiProperty()
  orderId: string;

  @ApiProperty()
  orderName: string;

  @ApiProperty()
  mId: string;

  @ApiProperty()
  cancels: CancelDto[];

  @ApiProperty()
  status: PaymentStatus;

  constructor(
    id: number,
    paymentKey: string,
    totalAmount: number,
    balanceAmount: number,
    type: PaymentType,
    orderId: string,
    orderName: string,
    mId: string,
    cancels: CancelDto[],
    status: PaymentStatus,
  ) {
    this.id = id;
    this.paymentKey = paymentKey;
    this.totalAmount = totalAmount;
    this.balanceAmount = balanceAmount;
    this.type = type;
    this.orderId = orderId;
    this.orderName = orderName;
    this.mId = mId;
    this.cancels = cancels;
    this.status = status;
  }

  static fromPayment(payment: Payment) {
    return new PaymentDto(
      payment.id,
      payment.paymentKey,
      payment.totalAmount,
      payment.balanceAmount,
      payment.type,
      payment.orderId,
      payment.orderName,
      payment.mId,
      payment.cancels,
      payment.status,
    );
  }
}
