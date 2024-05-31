import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ShopService } from './shop.service';
import { Shop } from './shop.entity';
import { IngredientDto } from './dto/ingredient.dto';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderDto } from './dto/order.dto';
import { PageResponse } from 'src/common/pagination/pagination-response';
import { OffsetPaginationOption } from 'src/common/pagination/offset-pagination-option';
import { ShopDto } from './dto/shop.dto';

@Controller('shop')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @ApiOperation({ summary: '매장 목록 조회', description: '매장 목록 조회' })
  @ApiOkResponse({ type: ShopDto, isArray: true })
  @Get('/list')
  getShopList(): Promise<ShopDto[]> {
    return this.shopService.getAllShops();
  }

  @ApiOperation({ summary: '매장 재료 목록 조회', description: '해당 매장의 재료 목록 조회' })
  @ApiOkResponse({ type: IngredientDto, isArray: true })
  @Get('/:shopId/ingredients')
  getIngredientsByShop(@Param('shopId') shopId: number): Promise<IngredientDto[]> {
    return this.shopService.getIngredientsByShop(shopId);
  }

  @ApiOperation({ summary: '매장 재료 추가', description: '해당 매장에 재료 벌크 추가' })
  @ApiBody({ type: [IngredientDto] })
  @Post('/:shopId/ingredients')
  createIngredients(@Param('shopId') shopId: number, @Body() ingredientDtos: IngredientDto[]): Promise<Shop> {
    return this.shopService.addIngredients(shopId, ingredientDtos);
  }

  @ApiOperation({ summary: '주문 생성', description: '해당 매장에 주문 생성' })
  @ApiOkResponse({ description: '정상적으로 주문 생성 완료', type: OrderDto })
  @ApiBody({ type: [CreateOrderDto] })
  @Post('/:shopId/order')
  createOrder(@Param('shopId') shopId: number, @Body() createOrder: CreateOrderDto): Promise<OrderDto> {
    const userId = 35;
    return this.shopService.createOrder(shopId, userId, createOrder.ingredientIds, createOrder.type);
  }

  @ApiOperation({ summary: '주문 목록 조회', description: '사용자가 생성한 주문 조회' })
  @ApiOkResponse({ type: OrderDto, isArray: true })
  @Get('/orders')
  getOrders(@Query() pageOption: OffsetPaginationOption): Promise<PageResponse<OrderDto>> {
    const userId = 35;
    return this.shopService.getOrdersByUserId(userId, pageOption);
  }
}
