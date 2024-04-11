import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from "@nestjs/mapped-types";

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
