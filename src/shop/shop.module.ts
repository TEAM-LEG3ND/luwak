import { Module } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './shop.entity';
import { Order } from './entity/order.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([Shop, Order]), PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule {}
