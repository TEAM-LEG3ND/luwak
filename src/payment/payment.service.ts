import { HttpException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Payment } from './payment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CancelCreateDto } from './Dto/cancel.dto';
import { Cancel } from './cancel.entity';
import { firstValueFrom } from 'rxjs';
import { ConfirmPaymentDto } from './Dto/payment.dto';
import { Order } from 'src/shop/entity/order.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Cancel)
    private readonly cancelRepository: Repository<Cancel>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private httpService: HttpService,
  ) {}

  private readonly logger = new Logger(PaymentService.name);

  async confirmPayment(data: ConfirmPaymentDto) {
    const { paymentKey, orderId, amount } = data;
    this.logger.warn(JSON.stringify(data));

    // 형식 판별
    if (isNaN(amount)) {
      throw new HttpException(`[Payment Error] amount is NaN + ${amount}`, 400);
    }

    // 서버 금액 검증
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });

    if (!order) {
      throw new HttpException('[Payment Error] order data not found', 404);
    }

    if (order.priceSum !== BigInt(amount)) {
      throw new HttpException('[Payment Error] payment amount validation fail', 400);
    }

    // toss payment 요청
    const newPayment = new Payment();
    newPayment.paymentKey = paymentKey;
    newPayment.orderId = orderId;
    newPayment.totalAmount = amount;

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
        newPayment.type = res.data['type'];
        newPayment.cancels = res.data['cancels'];

        this.paymentRepository.save(newPayment);
        return res.data;
      })
      .catch((err) => {
        this.logger.error(
          `[confirmPayment] error occurred, ${widgetSecretKey}, ${encryptedSecretKey}, ${orderId}, ${amount}, ${paymentKey}`,
        );
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
