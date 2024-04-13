import { Module } from '@nestjs/common';
import { CustomersController } from './controllers/customers/customers.controller';
import { UsersController } from './controllers/users/users.controller';
import { ProductsModule } from 'src/products/products.module';
import { CustomersService } from './services/customers/customers.service';
import { UsersService } from './services/users/users.service';
import { ProductsService } from 'src/products/services/products/products.service';

@Module({
  imports: [ProductsModule],
  controllers: [CustomersController, UsersController],
  providers: [CustomersService, UsersService, ProductsService],
})
export class UsersModule {}
