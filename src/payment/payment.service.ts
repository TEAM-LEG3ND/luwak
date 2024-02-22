import { Injectable, NotFoundException } from '@nestjs/common';
import { Payment } from './payment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentDto } from './Dto/payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async confirmPayment(data: any): Promise<string> {
    return 'test confirm response';
  }

  async findByPaymentKey(paymentKey: string): Promise<PaymentDto> {
    const payment = await this.paymentRepository.findOne({ where: { paymentKey } });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    return PaymentDto.fromPayment(payment);
  }
}
