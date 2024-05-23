import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Shop } from './shop.entity';
import { Ingredient } from './ingredient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IngredientDto } from './dto/ingredient.dto';
import { randomUUID } from 'crypto';
import { Order } from './order.entity';
import { OrderDto } from './dto/order.dto';

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

  async getIngredientsByShop(shopId: string): Promise<Ingredient[]> {
    const shop = await this.shopRepository.findOne({
      where: {
        id: shopId,
      },
    });
    return shop.ingredients;
  }

  async addIngredients(shopId: string, dto: IngredientDto[]): Promise<Shop> {
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

  async createOrder(shopId: string, ingredients: string[]): Promise<OrderDto> {
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
    newOrder.priceSum = BigInt(orderIngredients.map((dto) => dto.price).reduce((sum, current) => sum + current, 0));

    await this.orderRepository.save(newOrder);
    return {
      orderId: newOrder.id.toString(),
    };
  }

  private async validateIngredients(shopId: string, dto: IngredientDto[]): Promise<boolean> {
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
