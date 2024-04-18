import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly idbrand: number;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsNotEmpty()
  @ApiProperty()
  readonly idcategories: number[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  readonly limit: number;

  @IsOptional()
  @Min(0)
  readonly offset: number;
}
