import { ApiProperty } from '@nestjs/swagger';
import { Cancel } from '../cancel.entity';
import { Payment } from '../payment.entity';

export class CancelDto {
  @ApiProperty()
  id: string;

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
    id: string,
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

  constructor(cancelAmount: number, cancelReason: string, refundableAmount: number) {
    this.cancelAmount = cancelAmount;
    this.cancelReason = cancelReason;
    this.refundableAmount = refundableAmount;
  }

  static toCancel(cancelCreateDto: CancelCreateDto, payment: Payment) {
    return new Cancel(
      cancelCreateDto.cancelAmount,
      cancelCreateDto.cancelReason,
      cancelCreateDto.refundableAmount,
      payment,
    );
  }
}
