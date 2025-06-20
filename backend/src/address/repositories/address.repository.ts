import { Injectable } from "@nestjs/common";
import { DataSource, DeepPartial } from "typeorm";
import { AddressEntity } from "../entities/address.entity";

@Injectable()
export class AddressRepository {
  private readonly _repository;

  /**
   * Constructor for AddressRepository
   * @param _dataSource - The data source for the repository
   */
  constructor(private readonly _dataSource: DataSource) {
    this._repository = this._dataSource.getTreeRepository(AddressEntity);
  }

  /**
   * Finds an address by its ID.
   * @param addressId - The ID of the address to find
   */
  async findAddressById(addressId: string): Promise<AddressEntity | null> {
    return this._repository.findOne({
      where: { id: addressId },
      relations: ["customer"],
    });
  }

  /**
   * Finds all addresses associated with a specific customer ID.
   * @param idCustomer - The ID of the customer whose addresses are to be found
   */
  async findAddressByCustomer(idCustomer: string): Promise<AddressEntity[]> {
    return this._repository.find({
      where: { customer: { id: idCustomer } },
      relations: ["customer"],
    });
  }

  /**
   * Saves a new address or updates an existing one.
   * @param address - The address data to save
   */
  async saveAddress(address: DeepPartial<AddressEntity>) {
    const addressData = this._repository.create(address);
    return this._repository.save(addressData);
  }

  /**
   * Deletes an address by its ID.
   * @param id - The ID of the address to delete
   */
  async deleteAddressById(id: string): Promise<void> {
    await this._repository.delete(id);
  }
}
