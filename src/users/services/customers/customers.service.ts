import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/users/dtos/customers.dto';
import { CustomerEntity } from 'src/users/entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {

  constructor(@InjectRepository(CustomerEntity) private customerRepo: Repository<CustomerEntity>) {}

  async findAll() {
    return await this.customerRepo.find();
  }

  async findOne(id: number) {
    const customer = await this.customerRepo.findOneBy({ id });

    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  async create(data: CreateCustomerDto) {
    const newCustomer = this.customerRepo.create(data);
    return await this.customerRepo.save(newCustomer);
  }

  async update(id: number, changes: UpdateCustomerDto) {
    const customer = await this.customerRepo.findOneBy({ id });

    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    this.customerRepo.merge(customer, changes);

    return this.customerRepo.save(customer);
  }

  async delete(id: number) {
    const customer = await this.customerRepo.findOneBy({ id });

    if (!customer) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return this.customerRepo.delete(id);
  }
}
