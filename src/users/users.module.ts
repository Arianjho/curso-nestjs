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

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([CustomerEntity, UserEntity]),
  ],
  controllers: [CustomersController, UsersController],
  providers: [CustomersService, UsersService, ProductsService, BrandsService],
})
export class UsersModule {}
