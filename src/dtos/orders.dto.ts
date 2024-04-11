import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  readonly number: string;

  @IsDate()
  @IsNotEmpty()
  readonly date: string;

  @IsNumber()
  @IsNotEmpty()
  readonly total: string;
}
