import { AddressEntity } from "src/address/entities/address.entity";
import { OrderEntity } from "src/order/entities/order.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("customer")
export class CustomerEntity {
  @PrimaryGeneratedColumn("uuid")
    id: string;

  @Column()
    name: string;

  @Column()
    email: string;

  @OneToOne(() => AddressEntity)
  @JoinColumn({ name: "defaultShippingAddressId" })
  defaultShippingAddress: AddressEntity;

  @OneToOne(() => AddressEntity)
  @JoinColumn({ name: "defaultBillingAddressId" })
  defaultBillingAddress: AddressEntity

  @OneToMany(() => OrderEntity, order => order.customer)
  orders: OrderEntity[];

  @OneToMany(() => AddressEntity, address => address.customer)
  addresses: AddressEntity[];
}