import { ProductEntity } from "src/products/entities/product.entity";
import { UserEntity } from "./user.entity";

export class OrderEntity {
  date: Date;
  user: UserEntity;
  products: ProductEntity[];
}
