import { OrderEntity } from "src/order/entities/order.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("order_item")
export class OrderItemEntity {
  @PrimaryGeneratedColumn("uuid")
    id: string;

  @Column()
    productId: string;

  @Column()
    carrierId: string;

  @Column()
    quantity: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
    unitPrice: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
    totalPrice: string;

  @ManyToOne(() => OrderEntity, (order) => order.items)
    order: OrderEntity;
}
