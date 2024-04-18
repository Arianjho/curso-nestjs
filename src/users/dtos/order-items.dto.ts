import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateOrderItemsDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly idorder: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly idproduct: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly quantity: number;
}

export class UpdateOrderItemsDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly quantity: number;
}
