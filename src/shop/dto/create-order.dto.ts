import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum } from 'class-validator';
import { PackageType } from 'src/common/domain/package-type';
import { SizeType } from 'src/common/domain/size-type';
import { TemperatureType } from 'src/common/domain/temperature-type';
import { CreateOrderIngredientDto } from './create-order-ingredient.dto';

export class CreateOrderDto {
  @ApiProperty({ type: CreateOrderIngredientDto, isArray: true })
  @IsArray()
  ingredient: CreateOrderIngredientDto[];

  @ApiProperty({ type: 'enum', enum: PackageType, example: 'TO_GO' })
  @IsEnum(PackageType)
  packageType: PackageType;

  @ApiProperty({ type: 'enum', enum: TemperatureType, example: 'ICE' })
  @IsEnum(TemperatureType)
  temperatureType: TemperatureType;

  @ApiProperty({ type: 'enum', enum: SizeType, example: 'SMALL' })
  @IsEnum(SizeType)
  sizeType: SizeType;
}
