import { AddressEntity } from "src/address/entities/address.entity";
import { OrderEntity } from "src/order/entities/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("customer")
export class CustomerEntity {
  @PrimaryGeneratedColumn("uuid")
    id: string;

  @Column()
    name: string;

  @Column()
    email: string;

  @Column()
  defaultShippingAddressId: string;

  @Column()
  defaultBillingAddressId: string;

  @OneToMany(() => OrderEntity, order => order.customer)
  orders: OrderEntity[];

  @OneToMany(() => AddressEntity, address => address.customer)
  addresses: AddressEntity[];
}