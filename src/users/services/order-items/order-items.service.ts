import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/products/entities/product.entity';
import { CreateOrderItemsDto, UpdateOrderItemsDto } from 'src/users/dtos/order-items.dto';
import { OrderItemEntity } from 'src/users/entities/order-item.entity';
import { OrderEntity } from 'src/users/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItemEntity)
    private itemsRepo: Repository<OrderItemEntity>,
    @InjectRepository(OrderEntity) private orderRepo: Repository<OrderEntity>,
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
  ) {}

  async create(data: CreateOrderItemsDto) {
    const newOrderItem = new OrderItemEntity();

    if (data.idorder) {
      const order = await this.orderRepo.findOne({
        where: { id: data.idorder },
      });
      if (!order) {
        throw new NotFoundException(`Order #${data.idorder} not found`);
      }
      newOrderItem.order = order;
    }

    if (data.idproduct) {
      const product = await this.productRepo.findOne({
        where: { id: data.idproduct },
      });
      if (!product) {
        throw new NotFoundException(`Product #${data.idproduct} not found`);
      }
      newOrderItem.product = product;
    }

    newOrderItem.quantity = data.quantity;

    return await this.itemsRepo.save(newOrderItem);
  }

  async update(id: number, changes: UpdateOrderItemsDto) {
    const orderItem = await this.itemsRepo.findOne({ where: { id } });

    if (changes.quantity) {
      orderItem.quantity = changes.quantity;
    }

    return await this.itemsRepo.save(orderItem);
  }

  async remove(id: number) {
    const orderItem = await this.itemsRepo.findOne({ where: { id } });

    if (!orderItem) {
      throw new NotFoundException(`Order Item #${id} not found`);
    }

    return await this.itemsRepo.remove(orderItem);
  }
}
