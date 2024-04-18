import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly idcustomer: number;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
