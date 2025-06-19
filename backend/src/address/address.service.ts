import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { AddressRepository } from "./repositories/address.repository";
import { AddressEntity } from "./entities/address.entity";
import { AddressDto } from "./dtos/address.dto";
import { UpdateAddressDto } from "./dtos/update-address.dto";
import { CustomerRepository } from "src/customer/repositories/customer.repository";

@Injectable()
export class AddressService {
    constructor(
      private readonly _addressRepository: AddressRepository,
      private readonly _customerRepository: CustomerRepository,
    ){}

    async getAddressById(id: string): Promise<AddressDto> {
    const address = await this._addressRepository.findAddressById(id);
    if (!address)
      throw new NotFoundException(`Address with id ${id} not found`);

    return this.mapToDto(address);
  }

  async getAddresssByCustomerId(customerId: string): Promise<AddressEntity[]> {
    return this._addressRepository.findAddressByCustomer(customerId);
  }

  async deleteAddressById(id: string): Promise<void> {
    if (!id)
      throw new ForbiddenException("Address' id is requiered.");
    const address = await this._addressRepository.findAddressById(id);
    if (!address)
      throw new NotFoundException(`Address with id ${id} not found`);
    await this._addressRepository.deleteAddressById(id);
  }

  async updateAddress(id: string, updates: UpdateAddressDto): Promise<AddressDto> {
    if (!id)
      throw new ForbiddenException("L'ID du address est requis.");
    const address = await this._addressRepository.findAddressById(id);
    if (!address)
      throw new NotFoundException(`Adress with id ${id} not found`);
    const updated = Object.assign(address, updates);
    const saved = await this._addressRepository.saveAddress(updated);
    return this.mapToDto(saved);
  }

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

  async createAddress(dto: AddressDto): Promise<AddressEntity> {
    const customer = await this._customerRepository.findCustomerById(dto.customerId);
    if (!customer)
      throw new ForbiddenException("customer is not valid");

    const address = {
      id: dto.id,
      street: dto.street,
      city: dto.city,
      zipCode: dto.zipCode,
      country: dto.country,
      addressType: dto.addressType,
      customer: customer,
    };
    return this._addressRepository.saveAddress(address);
  }
}