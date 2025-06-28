import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { CustomerEntity } from "./entities/customer.entity";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";
import { CustomerRepository } from "./repositories/customer.repository";
import { AddressEntity } from "src/address/entities/address.entity";
import { OrderEntity } from "src/order/entities/order.entity";
import { AddressRepository } from "src/address/repositories/address.repository";
import { OrderRepository } from "src/order/repositories/order.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerEntity, AddressEntity, OrderEntity]),
  ],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    {
      provide: CustomerRepository,
      useFactory: (dataSource: DataSource) =>
        new CustomerRepository(dataSource),
      inject: [DataSource],
    },
    AddressRepository,
    OrderRepository,
  ],
  exports: [CustomerService],
})
export class CustomerModule {}