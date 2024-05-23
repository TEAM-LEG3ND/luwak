import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Point } from 'geojson';
import { Ingredient } from './ingredient.entity';
import { BaseEntity } from 'src/common/base.entity';


@Entity({ name: 'shops', synchronize: false })
export class Shop extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'point', nullable: true, spatialFeatureType: 'Point' })
  location: Point;

  @Column({ type: 'json' })
  ingredients: Ingredient[];
}
