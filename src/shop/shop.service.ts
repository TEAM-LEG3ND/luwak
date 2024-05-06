import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Shop } from './shop.entity';
import { Ingredient } from './entity/ingredient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IngredientDto } from './dto/ingredient.dto';
import { randomUUID } from 'crypto';
import { Order } from './entity/order.entity';
import { OrderDto } from './dto/order.dto';
import { OrderType } from 'src/common/domain/order-type';
import { PaginationOption } from 'src/common/pagination/pagination-option';
import { PageResponse } from 'src/common/pagination/pagination-response';
import { PaginationMeta } from 'src/common/pagination/pagination-meta';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getAllShops(): Promise<Shop[]> {
    const shops = this.shopRepository.find();
    return shops;
  }

  async getIngredientsByShop(shopId: number): Promise<Ingredient[]> {
    const shop = await this.shopRepository.findOne({
      where: {
        id: shopId,
      },
    });
    return shop.ingredients;
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

  async createOrder(shopId: number, userId: number, ingredients: string[], type: OrderType): Promise<OrderDto> {
    const shop = await this.shopRepository.findOne({
      where: {
        id: shopId,
      },
    });

    const targetIngredients = new Set(ingredients);
    const orderIngredients = shop.ingredients.filter((ingredient) => targetIngredients.has(ingredient.id));

    if (shop == null || targetIngredients.size === 0 || orderIngredients.length === 0) {
      throw new HttpException('validation fail', 400);
    }

    const newOrder = new Order();
    newOrder.ingredients = orderIngredients;
    newOrder.shopId = shopId;
    newOrder.type = type;
    newOrder.userId = userId;
    newOrder.priceSum = BigInt(orderIngredients.map((dto) => dto.price).reduce((sum, current) => sum + current, 0));

    return await this.orderRepository.save(newOrder).then((entity) => OrderDto.fromEntity(entity));
  }

  async getOrdersByUserId(userId: number, pageOption: PaginationOption): Promise<PageResponse<OrderDto>> {
    const queryBuilder = this.orderRepository.createQueryBuilder('getOrdersByUserId');

    queryBuilder
      .orderBy('createdAt', pageOption.order)
      .skip(pageOption.skip)
      .take(pageOption.take)
      .where({
        where: {
          userId: userId,
        },
      });

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
    const shop = await this.shopRepository.findOne({
      where: {
        id: shopId,
      },
    });
    const shopIngredientsId = shop.ingredients.map((entity) => entity.id);
    const ingredientsValid = dto.map((dto) => dto.id).every((dtoId) => shopIngredientsId.includes(dtoId));
    return nonNull && priceValid && ingredientsValid;
  }
}
