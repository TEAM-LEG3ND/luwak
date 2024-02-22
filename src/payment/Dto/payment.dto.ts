import { ApiProperty } from '@nestjs/swagger';
import { CancelDto } from './cancel.dto';
import { PaymentStatus, PaymentType } from '../payment.enum';

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
}
