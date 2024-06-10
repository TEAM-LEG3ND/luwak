import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Shop } from './shop.entity';
import { Ingredient } from './entity/ingredient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IngredientDto } from './dto/ingredient.dto';
import { randomUUID } from 'crypto';
import { Order } from './entity/order.entity';
import { OrderDto } from './dto/order.dto';
import { OffsetPaginationOption } from 'src/common/pagination/offset-pagination-option';
import { PageResponse } from 'src/common/pagination/pagination-response';
import { PaginationMeta } from 'src/common/pagination/pagination-meta';
import { ShopDto } from './dto/shop.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from 'src/common/domain/order-status';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getAllShops(): Promise<ShopDto[]> {
    const shops = await this.shopRepository.find();
    return shops.map((shop) => ShopDto.fromEntity(shop));
  }

  async getIngredientsByShop(shopId: number): Promise<IngredientDto[]> {
    const shop = await this.shopRepository.findOne({
      where: {
        id: shopId,
      },
    });
    return shop.ingredients.map((ingredient) => IngredientDto.fromEntity(ingredient));
  }

  async addIngredients(shopId: number, dto: IngredientDto[]): Promise<Shop> {
    const validationResult = await this.validateIngredients(shopId, dto);
    if (!validationResult) {
      throw new HttpException('validation fail', 400);
    }

    const shop = await this.shopRepository.findOne({
      where: {
        id: shopId,
      },
    });

    dto.forEach((dto) => {
      const newIngredient: Ingredient = {
        id: randomUUID(),
        price: dto.price,
        name: dto.name,
        description: dto.description,
        thumbnail: dto.thumbnail,
      };
      shop.ingredients.push(newIngredient);
    });
    return this.shopRepository.save(shop);
  }

  async createOrder(shopId: number, userId: number, createOrderDto: CreateOrderDto): Promise<OrderDto> {
    const shop = await this.shopRepository.findOne({
      where: {
        id: shopId,
      },
    });

    const targetIngredients = new Set(createOrderDto.ingredientIds);
    const orderIngredients = shop.ingredients.filter((ingredient) => targetIngredients.has(ingredient.id));

    if (shop == null || targetIngredients.size === 0 || orderIngredients.length === 0) {
      throw new HttpException('validation fail: shop not have such ', 400);
    }

    const newOrder = new Order();
    newOrder.ingredients = orderIngredients;
    newOrder.shopId = shopId;
    newOrder.size = createOrderDto.sizeType;
    newOrder.temperature = createOrderDto.temperatureType;
    newOrder.package = createOrderDto.packageType;
    newOrder.userId = userId;
    newOrder.priceSum = BigInt(
      orderIngredients.map((dto) => dto.price).reduce((sum, current) => sum + current, 0),
    ).toString();
    newOrder.status = OrderStatus.READY;

    return await this.orderRepository.save(newOrder).then((entity) => OrderDto.fromEntity(entity));
  }

  async getOrdersByOrderIdAndUser(userId: number, orderId: string): Promise<OrderDto> {
    const order = await this.orderRepository.findOne({
      where: {
        id: orderId,
        userId: userId,
      },
    });
    return OrderDto.fromEntity(order);
  }

  async getOrdersByUserId(userId: number, pageOption: OffsetPaginationOption): Promise<PageResponse<OrderDto>> {
    const queryBuilder = this.orderRepository.createQueryBuilder('getOrdersByUserId');

    queryBuilder
      .where('getOrdersByUserId.userId = :userId', { userId })
      .orderBy('getOrdersByUserId.created_at', pageOption.order)
      .skip(pageOption.skip)
      .take(pageOption.take);

    const count = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMeta = new PaginationMeta({ pageOption: pageOption, itemCount: count });

    return new PageResponse(
      entities.map((entity) => OrderDto.fromEntity(entity)),
      pageMeta,
    );
  }

  private async validateIngredients(shopId: number, dto: IngredientDto[]): Promise<boolean> {
    const nonNull = dto.every((dto) => dto.name != null && dto.thumbnail != null);
    const priceValid = dto.every((dto) => dto.price >= 0);
    console.log(nonNull, priceValid);
    return nonNull && priceValid;
  }
}
