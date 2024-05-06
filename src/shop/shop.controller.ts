import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ShopService } from './shop.service';
import { Shop } from './shop.entity';
import { Ingredient } from './entity/ingredient.entity';
import { IngredientDto } from './dto/ingredient.dto';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('shop')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @ApiOperation({ summary: '매장 목록 조회', description: '매장 목록 조회' })
  @Get('/list')
  getShopList(): Promise<Shop[]> {
    return this.shopService.getAllShops();
  }

  @ApiOperation({ summary: '매장 재료 목록 조회', description: '해당 매장의 재료 목록 조회' })
  @Get('/:shopId/ingredients')
  getIngredientsByShop(@Param(':shopId') shopId: number): Promise<Ingredient[]> {
    return this.shopService.getIngredientsByShop(shopId);
  }

  @ApiOperation({ summary: '매장 재료 추가', description: '해당 매장에 재료 벌크 추가' })
  @ApiBody({ type: [IngredientDto] })
  @Post('/:shopId/ingredients')
  createIngredients(@Param(':shopId') shopId: number, @Body() ingredientDtos: IngredientDto[]): Promise<Shop> {
    return this.shopService.addIngredients(shopId, ingredientDtos);
  }

  @ApiOperation({ summary: '주문 생성', description: '해당 매장에 주문 생성' })
  @ApiOkResponse({ description: '정상적으로 주문 생성 완료' })
  @ApiBody({ type: [CreateOrderDto] })
  @Post('/:shopId/order')
  createOrder(@Param(':shopId') shopId: number, @Body() createOrder: CreateOrderDto) {
    return this.shopService.createOrder(shopId, createOrder.ingredientIds, createOrder.type);
  }
}
