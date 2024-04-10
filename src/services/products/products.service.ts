import { Injectable } from '@nestjs/common';
import { ProductEntity } from 'src/entities/product.entity';

@Injectable()
export class ProductsService {
  private products: ProductEntity[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description 2',
      price: 200,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Description 3',
      price: 300,
      image: 'https://via.placeholder.com/150',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find((product) => product.id === id);
  }

  create(payload: any) {
    const newProduct = {
      id: this.products.length + 1,
      ...payload,
    };
    this.products.push(payload);

    return newProduct;
  }

  update(id: number, changes: any) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new Error('Product not found');
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
      throw new Error('Product not found');
    }
    const product = this.products[index];
    this.products = this.products.filter((product) => product.id !== id);
    return product;
  }
}
