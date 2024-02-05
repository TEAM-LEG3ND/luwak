import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Post('confirm')
    confirmPayment(@Body() data: any): string {
        return "test payment confirm response";
    }
}
