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
import { CustomerRepository } from "src/customer/repositories/customer.repository";
import { OrderItemRepository } from "src/order-item/repositories/order-item.repository";
import { AddressRepository } from "src/address/repositories/address.repository";

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
    OrderRepository,
    CustomerRepository,
    OrderItemRepository,
    AddressRepository,
  ],
  exports: [OrderService],
})
export class OrderModule {}
