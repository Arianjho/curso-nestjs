import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsNumber, IsPhoneNumber, IsPositive, IsString, Max, Min } from "class-validator";

export class CreateCustomerDto {
  @IsNumber()
  @Min(10000000)
  @Max(99999999)
  @IsNotEmpty()
  @IsPositive()
  readonly dni: number;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lastname: string;

  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPhoneNumber('PE')
  readonly phone: number;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
