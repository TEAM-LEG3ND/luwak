import { Injectable, NotFoundException } from '@nestjs/common';
import { Payment } from './payment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CancelCreateDto } from './Dto/cancel.dto';
import { Cancel } from './cancel.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Cancel)
    private readonly cancelRepository: Repository<Cancel>,
  ) {}

  async confirmPayment(data: any): Promise<string> {
    return 'test confirm response';
  }

  async findByPaymentKey(paymentKey: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({ where: { paymentKey } });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    return payment;
  }

  async findByOrderId(orderId: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({ where: { orderId } });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    return payment;
  }

  async cancelByPaymentKey(paymentKey: string, cancelCreateDto: CancelCreateDto): Promise<Payment> {
    const payment = await this.findByPaymentKey(paymentKey);

    const cancel: Cancel = Cancel.fromCancelCreateDto(cancelCreateDto, payment);
    this.cancelRepository.save(cancel);

    return payment;
  }
}
