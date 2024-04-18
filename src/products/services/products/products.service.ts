import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from 'src/products/dtos/products.dto';
import { ProductEntity } from 'src/products/entities/product.entity';
import { In, Repository } from 'typeorm';
import { CategoryEntity } from 'src/products/entities/category.entity';
import { BrandEntity } from 'src/products/entities/brand.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepo: Repository<CategoryEntity>,
    @InjectRepository(BrandEntity) private brandRepo: Repository<BrandEntity>,
  ) {}

  async findAll(params?: FilterProductsDto) {
    if (params) {
      const { limit, offset } = params;
      return await this.productRepo.find({
        relations: ['brand', 'categories'],
        take: limit,
        skip: offset,
      });
    }
    return await this.productRepo.find({ relations: ['brand', 'categories'] });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['brand', 'categories'],
    });

    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    const newProduct = this.productRepo.create(data);

    if (data.idbrand) {
      const brand = await this.brandRepo.findOne({
        where: { id: data.idbrand },
      });
      newProduct.brand = brand;
    }

    if (data.idcategories) {
      const categories = await this.categoryRepo.findBy({
        id: In([...data.idcategories]),
      });
      newProduct.categories = categories;
    }

    return await this.productRepo.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productRepo.findOneBy({ id });

    if (changes.idbrand) {
      const brand = await this.brandRepo.findOne({
        where: { id: changes.idbrand },
      });
      product.brand = brand;
    }

    if (changes.idcategories) {
      const categories = await this.categoryRepo.findBy({
        id: In([...changes.idcategories]),
      });
      product.categories = categories;
    }

    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    this.productRepo.merge(product, changes);

    return this.productRepo.save(product);
  }

  async removeCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categories'],
    });

    if (!product) {
      throw new NotFoundException(`Product #${productId} not found`);
    }

    product.categories = product.categories.filter(
      (item) => item.id !== categoryId,
    );

    return this.productRepo.save(product);
  }

  async addCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categories'],
    });

    if (!product) {
      throw new NotFoundException(`Product #${productId} not found`);
    }

    const category = await this.categoryRepo.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException(`Category #${categoryId} not found`);
    }

    if (product.categories.some((item) => item.id === categoryId)) {
      throw new NotFoundException(
        `Category #${categoryId} is already associated with this product`,
      );
    }

    product.categories.push(category);

    return this.productRepo.save(product);
  }

  async delete(id: number) {
    const product = await this.productRepo.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    return this.productRepo.delete(id);
  }
}
