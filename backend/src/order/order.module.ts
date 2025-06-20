import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { OrderEntity } from "src/order/entities/order.entity";
import { OrderService } from "./order.service";
import { OrderRepository } from "./repositories/order.repository";
import { OrderController } from "./order.controller";
import { CustomerEntity } from "src/customer/entities/customer.entity";
import { OrderItemEntity } from "src/order-item/entities/order-item.entity";
import { AddressEntity } from "src/address/entities/address.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      CustomerEntity,
      OrderItemEntity,
      AddressEntity,
    ]),
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: OrderRepository,
      useFactory: (dataSource: DataSource) => new OrderRepository(dataSource),
      inject: [DataSource],
    },
  ],
  exports: [OrderService],
})
export class OrderModule {}
