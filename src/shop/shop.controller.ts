import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ShopService } from './shop.service';
import { Shop } from './shop.entity';
import { Ingredient } from './ingredient.entity';
import { IngredientDto } from './dto/ingredient.dto';
import { ApiBody } from '@nestjs/swagger';

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

  @ApiBody({ type: [IngredientDto] })
  @Post('/:shopId/ingredients')
  createIngredients(@Param(':shopId') shopId: number, @Body() ingredientDtos: IngredientDto[]): Promise<Shop> {
    return this.shopService.addIngredients(shopId, ingredientDtos);
  }

  @ApiBody({ type: [IngredientDto] })
  @Post('/:shopId/order')
  createOrder(@Param(':shopId') shopId: number, @Body() ingredientIds: string[]) {
    return this.shopService.createOrder(shopId, ingredientIds);
  }
}
