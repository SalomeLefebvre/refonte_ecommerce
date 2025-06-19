import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { CustomerEntity } from "./entities/customer.entity";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";
import { CustomerRepository } from "./repositories/customer.repository";
import { AddressEntity } from "src/address/entities/address.entity";
import { OrderEntity } from "src/order/entities/order.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity, AddressEntity, OrderEntity])],
  controllers: [CustomerController],
  providers: [ CustomerService,
    {
      provide: CustomerRepository,
      useFactory: (dataSource: DataSource) => new CustomerRepository(dataSource),
      inject: [DataSource],
    },
  ],
  exports: [CustomerService],
})
export class CustomerModule {}