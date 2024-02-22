import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentDto } from './Dto/payment.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('confirm')
  async confirmPayment(@Body() data: any): Promise<string> {
    return this.paymentService.confirmPayment(data);
  }

  @Get(':paymentKey')
  async findByPaymentKey(@Param() paymentKey: string): Promise<PaymentDto> {
    return this.paymentService.findByPaymentKey(paymentKey);
  }

  @Get(':orderId')
  async findByOrderId(@Param() orderId: string): Promise<PaymentDto> {
    return this.paymentService.findByOrderId(orderId);
  }
}
