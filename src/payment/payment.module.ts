import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { Cancel } from './cancel.entity';
import { HttpModule } from '@nestjs/axios';
import { Order } from 'src/shop/entity/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, Cancel, Order]),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
