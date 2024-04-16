import { PartialType } from '@nestjs/swagger';
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

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('PE')
  readonly phone: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
