import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brands.dto';
import { BrandEntity } from 'src/products/entities/brand.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(BrandEntity) private brandRepo: Repository<BrandEntity>,
  ) {}

  async findAll() {
    return await this.brandRepo.find();
  }

  async findOne(id: number) {
    const brand = await this.brandRepo.findOne({
      relations: ['products'],
      where: {
        id
      }
    });

    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }

  async create(data: CreateBrandDto) {
    const newBrand = this.brandRepo.create(data);
    return await this.brandRepo.save(newBrand);
  }

  async update(id: number, changes: UpdateBrandDto) {
    const brand = await this.brandRepo.findOneBy({ id });

    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    this.brandRepo.merge(brand, changes);

    return this.brandRepo.save(brand);
  }

  async delete(id: number) {
    const brand = await this.brandRepo.findOneBy({ id });

    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }

    return this.brandRepo.delete(id);
  }
}
