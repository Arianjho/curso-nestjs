import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity({ name: "brands" })
export class BrandEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "varchar", length: 230, unique: true})
  name: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', default: () => 'CURRENT_TIMESTAMP'})
  updatedAt: Date;

  @OneToMany(() => ProductEntity, (product) => product.brand)
  products: ProductEntity[];
}
