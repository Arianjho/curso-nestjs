import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomersController } from './controllers/customers/customers.controller';
import { UsersController } from './controllers/users/users.controller';
import { ProductsModule } from 'src/products/products.module';
import { CustomersService } from './services/customers/customers.service';
import { UsersService } from './services/users/users.service';
import { ProductsService } from 'src/products/services/products/products.service';

import { CustomerEntity } from './entities/customer.entity';
import { UserEntity } from './entities/user.entity';
import { BrandsService } from 'src/products/services/brands/brands.service';
import { OrderEntity } from './entities/order.entity';
import { OrderItemEntity } from './entities/order-item.entity';
import { OrdersService } from './services/orders/orders.service';
import { OrdersController } from './controllers/orders/orders.controller';
import { OrderItemsService } from './services/order-items/order-items.service';
import { OrderItemsController } from './controllers/order-items/order-items.controller';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([
      CustomerEntity,
      UserEntity,
      OrderEntity,
      OrderItemEntity,
    ]),
  ],
  controllers: [
    CustomersController,
    UsersController,
    OrdersController,
    OrderItemsController,
  ],
  providers: [
    CustomersService,
    UsersService,
    ProductsService,
    BrandsService,
    OrdersService,
    OrderItemsService,
  ],
})
export class UsersModule {}
