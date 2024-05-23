import { ApiProperty } from '@nestjs/swagger';
import { CancelDto } from './cancel.dto';
import { PaymentType } from '../payment.enum';
import { Payment } from '../payment.entity';
import { IsString, IsNumber } from 'class-validator';

export class PaymentDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  paymentKey: string;

  @ApiProperty()
  totalAmount: number;

  @ApiProperty()
  type: PaymentType;

  @ApiProperty()
  orderId: string;

  @ApiProperty()
  cancels: CancelDto[];

  constructor(
    id: string,
    paymentKey: string,
    totalAmount: number,
    type: PaymentType,
    orderId: string,
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
  @IsString()
  orderId: string;

  @ApiProperty()
  @IsNumber()
  amount: number;
}