import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { AddressEntity } from "./entities/address.entity";
import { AddressController } from "./address.controller";
import { AddressRepository } from "./repositories/address.repository";
import { AddressService } from "./address.service";
import { CustomerEntity } from "src/customer/entities/customer.entity";

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
  ],
  exports: [AddressService],
})
export class AddressModule {}
