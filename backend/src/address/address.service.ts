import { Injectable } from "@nestjs/common";
import { AddressRepository } from "./repositories/address.repository";
import { AddressEntity } from "./entities/address.entity";
import { AddressDto } from "./dtos/address.dto";
import { UpdateAddressDto } from "./dtos/update-address.dto";
import { CustomerRepository } from "src/customer/repositories/customer.repository";

@Injectable()
export class AddressService {
  /**
   * Constructor for AddressService
   * @param _addressRepository - Repository for managing addresses
   */
  constructor(
    private readonly _addressRepository: AddressRepository,
    private readonly _customerRepository: CustomerRepository,
  ) {}

  /**
   * Retrieves an address by its ID.
   * @param id - The ID of the address to retrieve
   */
  async getAddressById(id: string): Promise<AddressDto | null> {
  const address = await this._addressRepository.findAddressById(id);
  return address ? this.mapToDto(address) : null;
  }

  /**
   * Retrieves all addresses associated with a specific customer ID.
   * @param customerId - The ID of the customer whose addresses are to be retrieved
   */
  async getAddresssByCustomerId(customerId: string): Promise<AddressEntity[]> {
    return this._addressRepository.findAddressByCustomer(customerId);
  }

  /**
   * Deletes an address by its ID.
   * @param id - The ID of the address to delete
   */
  async deleteAddressById(id: string): Promise<boolean> {
  const address = await this._addressRepository.findAddressById(id);
  if (!address) return false;
  await this._addressRepository.deleteAddressById(id);
  return true;
 }

  /**
   * Updates an existing address.
   * @param id - The ID of the address to update
   */
  async updateAddress(
  id: string,
  updates: UpdateAddressDto,
  ): Promise<AddressDto | null> {
    const address = await this._addressRepository.findAddressById(id);
    if (!address) return null;
    const updated = Object.assign(address, updates);
    const saved = await this._addressRepository.saveAddress(updated);
    return this.mapToDto(saved);
  }

  /**
   * Maps an AddressEntity to an AddressDto.
   * @param address - The AddressEntity to map
   */
  private mapToDto(address: AddressEntity): AddressDto {
    return {
      id: address.id,
      street: address.street,
      city: address.city,
      zipCode: address.zipCode,
      country: address.country,
      addressType: address.addressType,
      customerId: address.customer.id,
    };
  }

  /**
   * Creates a new address.
   * @param dto - The AddressDto containing address details
   * @returns The created AddressEntity
   */
  async createAddress(dto: AddressDto): Promise<AddressEntity | null> {
  const customer = await this._customerRepository.findCustomerById(dto.customerId);
  if (!customer) return null;
  const address = {
    id: dto.id,
    street: dto.street,
    city: dto.city,
    zipCode: dto.zipCode,
    country: dto.country,
    addressType: dto.addressType,
    customer,
  };
  return this._addressRepository.saveAddress(address);
  }
}
