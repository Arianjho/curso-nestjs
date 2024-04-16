import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/products/dtos/categories.dto';
import { CategoryEntity } from 'src/products/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepo: Repository<CategoryEntity>,
  ) {}

  async findAll() {
    return await this.categoryRepo.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({
      where: {
        id,
      },
      relations: ['products']
    });

    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  async create(payload: CreateCategoryDto) {
    const newCategory = this.categoryRepo.create(payload);
    return await this.categoryRepo.save(newCategory);
  }

  async update(id: number, changes: UpdateCategoryDto) {
    const category = await this.categoryRepo.findOneBy({ id });

    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    this.categoryRepo.merge(category, changes);

    return this.categoryRepo.save(category);
  }

  async delete(id: number) {
    const category = await this.categoryRepo.findOneBy({ id });

    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    return this.categoryRepo.delete(id);
  }
}
