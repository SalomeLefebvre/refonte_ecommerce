import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { AddressEntity } from "./entities/address.entity";
import { AddressController } from "./address.controller";
import { AddressRepository } from "./repositories/address.repository";
import { CustomerEntity } from "src/customer/entities/customer.entity";
import { AddressService } from "./address.service";
import { CustomerRepository } from "src/customer/repositories/customer.repository";

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity, CustomerEntity])],
  controllers: [AddressController],
  providers: [
    AddressService,
    {
      provide: AddressRepository,
      useFactory: (dataSource: DataSource) => new AddressRepository(dataSource),
      inject: [DataSource],
    },
    CustomerRepository,
  ],
  exports: [AddressService],
})
export class AddressModule {}
