import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { Cancel } from './cancel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Cancel])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
