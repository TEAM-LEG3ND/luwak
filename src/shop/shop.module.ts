import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/config/database.module';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { usersProviders } from 'src/users/users.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ShopController],
  providers: [...usersProviders, ShopService],
})
export class ShopModule {}
