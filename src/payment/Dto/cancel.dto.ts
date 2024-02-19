import { ApiProperty } from '@nestjs/swagger';

export class CancelDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  cancelAmount: number;

  @ApiProperty()
  cancelReason: string;

  @ApiProperty()
  refundableAmount: number;

  @ApiProperty()
  canceledAt: string;

  @ApiProperty()
  transactionKey: string;

  @ApiProperty()
  receiptKey: string;
}
