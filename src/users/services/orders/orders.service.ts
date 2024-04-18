import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto, UpdateOrderDto } from 'src/users/dtos/orders.dto';
import { OrderEntity } from 'src/users/entities/order.entity';
import { Repository } from 'typeorm';
import { CustomerEntity } from 'src/users/entities/customer.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity) private orderRepo: Repository<OrderEntity>,
    @InjectRepository(CustomerEntity)
    private customerRepo: Repository<CustomerEntity>,
  ) {}

  async findAll() {
    return await this.orderRepo.find({
      relations: ['customer', 'items', 'items.product'],
    });
  }

  async findOne(id: number) {
    const order = this.orderRepo.findOneBy({ id });
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }

  async create(data: CreateOrderDto) {
    const newOrder = new OrderEntity();

    if (data.idcustomer) {
      const customer = await this.customerRepo.findOne({
        where: { id: data.idcustomer },
      });
      if (!customer) {
        throw new NotFoundException(`Customer #${data.idcustomer} not found`);
      }
      newOrder.customer = customer;
    }
    return await this.orderRepo.save(newOrder);
  }

  async update(id: number, changes: UpdateOrderDto) {
    const order = await this.orderRepo.findOne({ where: { id } });

    if (changes.idcustomer) {
      const customer = await this.customerRepo.findOne({
        where: { id: changes.idcustomer },
      });

      if (!customer) {
        throw new NotFoundException(
          `Customer #${changes.idcustomer} not found`,
        );
      }

      order.customer = customer;
    }

    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }

    return this.orderRepo.save(order);
  }

  async remove(id: number) {
    const order = await this.orderRepo.findOne({ where: { id } });

    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return this.orderRepo.delete(id);
  }
}
