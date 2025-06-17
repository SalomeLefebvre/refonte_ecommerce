import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  @Column({ unique: true })
    email: string;

  @Column({ nullable: true })
    avatar: string;

  @Column({ default: false })
    disabled: boolean;
}

