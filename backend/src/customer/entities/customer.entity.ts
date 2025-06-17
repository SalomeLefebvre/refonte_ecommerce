import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("customer")
export class CustomerEntity {
  @PrimaryGeneratedColumn("uuid")
    id: string;

  @Column()
    name: string;

  @Column()
    email: string;
}