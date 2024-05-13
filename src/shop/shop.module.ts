import { Module } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './shop.entity';
import { Order } from './entity/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shop, Order])],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule {}
