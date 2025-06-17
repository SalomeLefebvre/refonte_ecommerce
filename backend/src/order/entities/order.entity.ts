import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  @Column({ type: "decimal", precision: 10, scale: 2 })
    orderTotal: string;
}