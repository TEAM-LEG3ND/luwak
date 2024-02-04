import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Point } from 'geojson';

@Entity({ name: 'shops' })
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;
}
