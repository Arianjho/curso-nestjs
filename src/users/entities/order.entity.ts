import { CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CustomerEntity } from "./customer.entity";
import { OrderItemEntity } from "./order-item.entity";

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', default: () => 'CURRENT_TIMESTAMP'})
  updatedAt: Date;

  @ManyToOne(() => CustomerEntity, (customer) => customer.orders)
  customer: CustomerEntity;

  @OneToMany(() => OrderItemEntity, (item) => item.order)
  items: OrderItemEntity[];
}
