import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Point } from 'geojson';
import { Ingredient } from './ingredient.entity';

@Entity({ name: 'shops' })
export class Shop extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'point', nullable: true, spatialFeatureType: 'Point' })
  location: Point;

  @Column({ type: 'json' })
  ingredients: Ingredient[];
}