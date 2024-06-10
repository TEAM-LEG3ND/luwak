import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Point } from 'geojson';
import { Ingredient } from './entity/ingredient.entity';

@Entity({ name: 'shops', synchronize: false })
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'point',
    nullable: true,
    spatialFeatureType: 'Point',
    transformer: {
      from: (v) => v,
      to: (v) => `${v.x}, ${v.y}`,
    },
  })
  location: Point;

  @Column({ type: 'json' })
  ingredients: Ingredient[];
}
