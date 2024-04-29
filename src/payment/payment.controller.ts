import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ConfirmPaymentDto, PaymentDto } from './Dto/payment.dto';
import { CancelCreateDto } from './Dto/cancel.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiBody({ type: ConfirmPaymentDto })
  @Post('confirm')
  async confirmPayment(@Body() data: ConfirmPaymentDto) {
    return this.paymentService.confirmPayment(data);
  }

  @Get(':paymentKey')
  async findByPaymentKey(@Param() paymentKey: string): Promise<PaymentDto> {
    const payment = await this.paymentService.findByPaymentKey(paymentKey);
    return PaymentDto.fromPayment(payment);
  }

  @Get(':orderId')
  async findByOrderId(@Param() orderId: number): Promise<PaymentDto> {
    const payment = await this.paymentService.findByOrderId(orderId);
    return PaymentDto.fromPayment(payment);
  }

  @Post(':paymentKey/cancel')
  async cancelByPaymentKey(@Param() paymentKey: string, @Body() data: CancelCreateDto): Promise<PaymentDto> {
    const payment = await this.paymentService.cancelByPaymentKey(paymentKey, data);
    return PaymentDto.fromPayment(payment);
  }
}
