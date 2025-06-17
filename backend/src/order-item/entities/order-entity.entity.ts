import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("order_entity")
export class OrderEntityEntity {
  @PrimaryGeneratedColumn("uuid")
    id: string;

  @Column()
    productId: string;

  @Column()
    carrierId: string;

  @Column()
    paymentId: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
    unitPrice: string;

   @Column({ type: "decimal", precision: 10, scale: 2 })
    totalPrice: string;
}