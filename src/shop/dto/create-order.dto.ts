import { ApiProperty } from '@nestjs/swagger';
import { PackageType } from 'src/common/domain/package-type';
import { SizeType } from 'src/common/domain/size-type';
import { TemperatureType } from 'src/common/domain/temperature-type';

export class CreateOrderDto {
  @ApiProperty()
  ingredientIds: string[];

  @ApiProperty({ type: 'enum', enum: PackageType, example: 'TO_GO' })
  packageType: PackageType;

  @ApiProperty({ type: 'enum', enum: TemperatureType, example: 'ICE' })
  temperatureType: TemperatureType;

  @ApiProperty({ type: 'enum', enum: SizeType, example: 'SMALL' })
  sizeType: SizeType;
}
