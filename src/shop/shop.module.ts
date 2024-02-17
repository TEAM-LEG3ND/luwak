import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/config/database.module';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { shopProviders } from './shop.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ShopController],
  providers: [...shopProviders, ShopService],
})
export class ShopModule {}
