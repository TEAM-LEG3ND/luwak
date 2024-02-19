import { ApiProperty } from '@nestjs/swagger';
import { CancelDto } from './cancel.dto';

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
  type: string;

  @ApiProperty()
  orderId: string;

  @ApiProperty()
  orderName: string;

  @ApiProperty()
  mId: string;

  @ApiProperty()
  cancels: CancelDto[];

  @ApiProperty()
  status: string;
}
