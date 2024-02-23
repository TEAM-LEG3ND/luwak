import { ApiProperty } from '@nestjs/swagger';
import { Cancel } from '../cancel.entity';

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

  constructor(
    id: number,
    cancelAmount: number,
    cancelReason: string,
    refundableAmount: number,
    canceledAt: string,
    transactionKey: string,
    receiptKey: string,
  ) {
    this.id = id;
    this.cancelAmount = cancelAmount;
    this.cancelReason = cancelReason;
    this.refundableAmount = refundableAmount;
    this.canceledAt = canceledAt;
    this.transactionKey = transactionKey;
    this.receiptKey = receiptKey;
  }

  static fromCancel(cancel: Cancel) {
    return new CancelDto(
      cancel.id,
      cancel.cancelAmount,
      cancel.cancelReason,
      cancel.refundableAmount,
      cancel.canceledAt,
      cancel.transactionKey,
      cancel.receiptKey,
    );
  }
}

export class CancelCreateDto {
  @ApiProperty()
  cancelAmount: number;

  @ApiProperty()
  cancelReason: string;

  @ApiProperty()
  refundableAmount: number;
}
