import { ApiProperty } from '@nestjs/swagger';
import { CancelDto } from './cancel.dto';
import { PaymentType } from '../payment.enum';
import { Payment } from '../payment.entity';
import { IsString, IsNumber } from 'class-validator';

export class PaymentDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  paymentKey: string;

  @ApiProperty()
  totalAmount: number;

  @ApiProperty()
  type: PaymentType;

  @ApiProperty()
  orderId: number;

  @ApiProperty()
  cancels: CancelDto[];

  constructor(
    id: number,
    paymentKey: string,
    totalAmount: number,
    type: PaymentType,
    orderId: number,
    cancels: CancelDto[],
  ) {
    this.id = id;
    this.paymentKey = paymentKey;
    this.totalAmount = totalAmount;
    this.type = type;
    this.orderId = orderId;
    this.cancels = cancels;
  }

  static fromPayment(payment: Payment) {
    return new PaymentDto(
      payment.id,
      payment.paymentKey,
      payment.totalAmount,
      payment.type,
      payment.orderId,
      payment.cancels,
    );
  }
}

export class ConfirmPaymentDto {
  @ApiProperty()
  @IsString()
  paymentKey: string;

  @ApiProperty()
  @IsNumber()
  orderId: number;

  @ApiProperty()
  @IsNumber()
  amount: number;
}