import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ShopService } from './shop.service';
import { Shop } from './shop.entity';
import { Ingredient } from './ingredient.entity';
import { IngredientDto } from './dto/ingredient.dto';

@Controller('shop')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Get('/list')
  getShopList(): Promise<Shop[]> {
    return this.shopService.getAllShops();
  }

  @Get('/:shopId/ingredients')
  getIngredientsByShop(@Param(':shopId') shopId: number): Promise<Ingredient[]> {
    return this.shopService.getIngredientsByShop(shopId);
  }

  @Post('/:shopId/ingredients')
  createIngredients(@Param(':shopId') shopId: number, @Body() ingredientDtos: IngredientDto[]): Promise<Shop> {
    return this.shopService.addIngredients(shopId, ingredientDtos);
  }
}
