import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/products/dtos/categories.dto';
import { CategoryEntity } from 'src/products/entities/category.entity';

@Injectable()
export class CategoriesService {
  private categories: CategoryEntity[] = [
    {
      id: 1,
      name: 'Categoria 1',
    },
    {
      id: 2,
      name: 'Categoria 2',
    },
    {
      id: 3,
      name: 'Categoria 3',
    },
  ];

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    const category = this.categories.find((category) => category.id === id);
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }1
    return category;
  }

  create(payload: CreateCategoryDto) {
    const newCategory = {
      id: this.categories.length + 1,
      ...payload,
    };
    this.categories.push(newCategory);

    return newCategory;
  }

  update(id: number, changes: UpdateCategoryDto) {
    const index = this.categories.findIndex((category) => category.id === id);
    if (index === -1) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    this.categories[index] = {
      ...this.categories[index],
      ...changes,
    };
    return this.categories[index];
  }

  delete(id: number) {
    const index = this.categories.findIndex((category) => category.id === id);
    if (index === -1) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    const category = this.categories[index];
    this.categories = this.categories.filter((category) => category.id !== id);
    return category;
  }
}
