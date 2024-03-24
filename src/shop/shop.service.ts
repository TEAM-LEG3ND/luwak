import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Shop } from './shop.entity';
import { Ingredient } from './ingredient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IngredientDto } from './dto/ingredient.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
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

  async addIngredients(shopId: number, dto: IngredientDto[]): Promise<Ingredient[]> {
    if (!this.validateIngredients(dto)) {
      throw new HttpException('validation fail', 400);
    }

    const shop = await this.shopRepository.findOne({
      where: {
        id: shopId,
      },
    });

    dto.forEach((dto) =>
      shop.ingredients.push({
        id: randomUUID(),
        price: dto.price,
        name: dto.name,
        description: dto.description,
        thumbnail: dto.thumbnail,
      }),
    );
    await this.shopRepository.save(shop);
    return shop.ingredients;
  }

  private validateIngredients(dto: IngredientDto[]): boolean {
    const nonNull = dto.every((dto) => dto.name != null && dto.thumbnail != null);
    const priceValid = dto.every((dto) => dto.price >= 0);
    return nonNull && priceValid;
  }
}
