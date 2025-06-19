import { CustomerEntity } from "src/customer/entities/customer.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("address")
export class AddressEntity {
  @PrimaryGeneratedColumn("uuid")
    id: string;

  @Column()
    street: string;

  @Column()
    city: string;

  @Column()
    zipCode: string;

  @Column()
    country: string;
  
  @Column()
    addressType: string;

  @ManyToOne(() => CustomerEntity, customer => customer.addresses)
  customer: CustomerEntity; 
}

