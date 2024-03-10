import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Payment } from './payment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CancelCreateDto } from './Dto/cancel.dto';
import { Cancel } from './cancel.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Cancel)
    private readonly cancelRepository: Repository<Cancel>,

    private httpService: HttpService,
  ) {}

  async confirmPayment(data: any) {
    const { paymentKey, orderId, amount } = data;

    const widgetSecretKey = process.env.TOSSPAYMENTS_SECRET;
    const encryptedSecretKey = 'Basic ' + Buffer.from(widgetSecretKey + ':').toString('base64');
    await firstValueFrom(
      this.httpService.post(
        'https://api.tosspayments.com/v1/payments/confirm',
        {
          orderId,
          amount,
          paymentKey,
        },
        {
          headers: {
            Authorization: encryptedSecretKey,
            'Content-Type': 'application/json',
          },
        },
      ),
    )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw err.response.data;
      });
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

    const cancel: Cancel = CancelCreateDto.toCancel(cancelCreateDto, payment);
    this.cancelRepository.save(cancel);

    return payment;
  }
}
