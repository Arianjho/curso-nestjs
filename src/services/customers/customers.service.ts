import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/dtos/customers.dto';
import { CustomerEntity } from 'src/entities/customer.entity';

@Injectable()
export class CustomersService {
  private customers: CustomerEntity[] = [
    {
      id: 1,
      dni: 12345678,
      name: 'Cliente 1',
      lastname: 'Apellido 1',
      address: 'Direccion 1',
      phone: 987654321,
    },
    {
      id: 2,
      dni: 87654321,
      name: 'Cliente 2',
      lastname: 'Apellido 2',
      address: 'Direccion 2',
      phone: 123456789,
    },
    {
      id: 3,
      dni: 12348765,
      name: 'Cliente 3',
      lastname: 'Apellido 3',
      address: 'Direccion 3',
      phone: 678912345,
    }
  ];

  findAll() {
    return this.customers;
  }

  findOne(id: number) {
    const customer = this.customers.find((customer) => customer.id === id);
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }1
    return customer;
  }

  create(payload: CreateCustomerDto) {
    const newCustomer = {
      id: this.customers.length + 1,
      ...payload,
    };
    this.customers.push(newCustomer);

    return newCustomer;
  }

  update(id: number, changes: UpdateCustomerDto) {
    const index = this.customers.findIndex((customer) => customer.id === id);
    if (index === -1) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    this.customers[index] = {
      ...this.customers[index],
      ...changes,
    };
    return this.customers[index];
  }

  delete(id: number) {
    const index = this.customers.findIndex((customer) => customer.id === id);
    if (index === -1) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    const customer = this.customers[index];
    this.customers = this.customers.filter((customer) => customer.id !== id);
    return customer;
  }
}
