import { Injectable } from "@nestjs/common";
import { DataSource, DeepPartial } from "typeorm";
import { AddressEntity } from "../entities/address.entity";

@Injectable()
export class AddressRepository {
  private readonly _repository;

  constructor(private readonly _dataSource: DataSource) {
    this._repository = this._dataSource.getTreeRepository(AddressEntity);
  }

  async findAddressById(addressId: string): Promise<AddressEntity | null> {
    return this._repository.findOne({
      where: { id: addressId },
      relations: ["customer"],
    });
  }

  async findAddressByCustomer(idCustomer: string): Promise<AddressEntity[]> {
    return this._repository.find({
      where: { customer: { id: idCustomer } },
      relations: ["customer"],
  });
  }

  async saveAddress(address: DeepPartial<AddressEntity>) {
  const addressData = this._repository.create(address);
  return this._repository.save(addressData);
  }

  async deleteAddressById(id: string): Promise<void> {
    await this._repository.delete(id);
  }
}