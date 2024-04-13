import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/products/dtos/products.dto';
import { ProductEntity } from 'src/products/entities/product.entity';

@Injectable()
export class ProductsService {
  private products: ProductEntity[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description 2',
      price: 200,
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Description 3',
      price: 300,
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(payload: CreateProductDto) {
    const newProduct = {
      id: this.products.length + 1,
      ...payload,
    };
    this.products.push(newProduct);

    return newProduct;
  }

  update(id: number, changes: UpdateProductDto) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.products[index] = {
      ...this.products[index],
      ...changes,
    };
    return this.products[index];
  }

  delete(id: number) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    const product = this.products[index];
    this.products = this.products.filter((product) => product.id !== id);
    return product;
  }
}
