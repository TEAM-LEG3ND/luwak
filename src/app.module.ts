import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database.module';
import { PaymentModule } from './payment/payment.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ShopModule } from './shop/shop.module';
@Module({
  imports: [DatabaseModule, PaymentModule, AuthModule, UsersModule, ShopModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
