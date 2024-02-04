import { Controller, Get, Param } from '@nestjs/common';
import { ShopService } from './shop.service';
import { Shop } from './shop.entity';
import { Ingredient } from './ingredient.entity';

@Controller('shop')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Get('/list')
  getShopList(): Promise<Shop[]> {
    return this.shopService.getAllShops();
  }

  @Get('/:shopId/ingredients')
  getIngredientsByShop(@Param() shopId: number): Promise<Ingredient[]> {
    return this.shopService.getIngredientsByShop(shopId);
  }
}
