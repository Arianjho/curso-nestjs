import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsNumber, IsPhoneNumber, IsPositive, IsString, Max, Min } from "class-validator";

export class CreateCustomerDto {
  @IsNumber()
  @Min(10000000)
  @Max(99999999)
  @IsNotEmpty()
  @IsPositive()
  dni: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPhoneNumber('PE')
  phone: number;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
