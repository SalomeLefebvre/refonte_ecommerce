import { AddressEntity } from "src/address/entities/address.entity";
import { CustomerEntity } from "src/customer/entities/customer.entity";
import { OrderItemEntity } from "src/order-item/entities/order-item.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("order")
export class OrderEntity {
  @PrimaryGeneratedColumn("uuid")
    id: string;

  @Column({ type: "timestamp" })
    orderDate: Date;

  @Column()
    status: string;

  @Column()
    carrierId: string;

  @Column()
    paymentId: string;

  @Column({ type: "decimal" })
    orderTotal: string;
  
  @ManyToOne(() => AddressEntity)
  @JoinColumn({ name: "shippingAddressId" })
  shippingAddress: AddressEntity;

  @ManyToOne(() => AddressEntity)
  @JoinColumn({ name: "billingAddressId" })
  billingAddress: AddressEntity;
  
  @ManyToOne(() => CustomerEntity, customer => customer.orders)
  customer: CustomerEntity;

  @OneToMany(() => OrderItemEntity, item => item.order)
  items: OrderItemEntity[];
}