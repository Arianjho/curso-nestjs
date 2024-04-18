import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { OrderEntity } from './order.entity';

@Entity({ name: 'customers' })
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unique: true })
  dni: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  lastname: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'varchar', length: 255 })
  phone: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToOne(() => UserEntity, (user) => user.customer, { nullable: true })
  user: UserEntity;

  @OneToMany(() => OrderEntity, (order) => order.customer)
  orders: OrderEntity[];
}
