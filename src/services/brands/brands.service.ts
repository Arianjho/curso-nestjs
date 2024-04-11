import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from 'src/dtos/brands.dto';
import { BrandEntity } from 'src/entities/brand.entity';

@Injectable()
export class BrandsService {
  private brands: BrandEntity[] = [
    {
      id: 1,
      name: 'Marca 1',
    },
    {
      id: 2,
      name: 'Marca 2',
    },
    {
      id: 3,
      name: 'Marca 3',
    },
  ];

  findAll() {
    return this.brands;
  }

  findOne(id: number) {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }1
    return brand;
  }

  create(payload: CreateBrandDto) {
    console.log(payload);

    const newBrand = {
      id: this.brands.length + 1,
      ...payload,
    };
    this.brands.push(newBrand);

    return newBrand;
  }

  update(id: number, changes: UpdateBrandDto) {
    const index = this.brands.findIndex((brand) => brand.id === id);
    if (index === -1) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    this.brands[index] = {
      ...this.brands[index],
      ...changes,
    };
    return this.brands[index];
  }

  delete(id: number) {
    const index = this.brands.findIndex((brand) => brand.id === id);
    if (index === -1) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    const brand = this.brands[index];
    this.brands = this.brands.filter((brand) => brand.id !== id);
    return brand;
  }
}
