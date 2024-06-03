import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ConfirmPaymentDto, PaymentDto } from './Dto/payment.dto';
import { CancelCreateDto } from './Dto/cancel.dto';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({ summary: '결제 요청', description: '토스페이먼츠로 결제 요청' })
  @ApiOkResponse({ description: '토스페이먼츠로부터 결제 완료 객체 반환', type: ConfirmPaymentDto })
  @ApiBody({ type: ConfirmPaymentDto })
  @Post('confirm')
  async confirmPayment(@Body() data: ConfirmPaymentDto) {
    return this.paymentService.confirmPayment(data);
  }

  @ApiOperation({ summary: '결제 조회(결제 KEY)', description: '결제 KEY로 결제 조회' })
  @ApiOkResponse({ description: '결제 조회 성공(결제 KEY)', type: PaymentDto })
  @Get(':paymentKey')
  async findByPaymentKey(@Param('paymentKey') paymentKey: string): Promise<PaymentDto> {
    const payment = await this.paymentService.findByPaymentKey(paymentKey);
    return PaymentDto.fromPayment(payment);
  }

  @ApiOperation({ summary: '결제 조회(주문 ID)', description: '주문 ID로 결제 조회' })
  @ApiOkResponse({ description: '결제 조회 성공(주문 ID)', type: PaymentDto })
  @Get(':orderId')
  async findByOrderId(@Param('orderId') orderId: string): Promise<PaymentDto> {
    const payment = await this.paymentService.findByOrderId(orderId);
    return PaymentDto.fromPayment(payment);
  }

  @ApiOperation({ summary: '결제 취소 요청', description: '결제 취소 요청 생성' })
  @ApiOkResponse({ description: '결제 취소 성공!', type: PaymentDto })
  @Post(':paymentKey/cancel')
  async cancelByPaymentKey(
    @Param('paymentKey') paymentKey: string,
    @Body() data: CancelCreateDto,
  ): Promise<PaymentDto> {
    const payment = await this.paymentService.cancelByPaymentKey(paymentKey, data);
    return PaymentDto.fromPayment(payment);
  }
}
