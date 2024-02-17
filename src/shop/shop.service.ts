import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Shop } from './shop.entity';
import { Ingredient } from './ingredient.entity';

@Injectable()
export class ShopService {
  constructor(
    @Inject('SHOP_REPOSITORY')
    private shopRepository: Repository<Shop>,
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
}
