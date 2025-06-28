import { Injectable } from "@nestjs/common";
import { CustomerRepository } from "./repositories/customer.repository";
import { CustomerEntity } from "./entities/customer.entity";
import { CustomerDto } from "./dtos/customer.dto";
import { UpdateCustomerDto } from "./dtos/update-customer.dto";
import { AddressRepository } from "src/address/repositories/address.repository";

@Injectable()
export class CustomerService {
  /**
   * Constructor for CustomerService
   * @param _customerRepository – Repository for managing customers
   */
  constructor(
    private readonly _customerRepository: CustomerRepository,
    private readonly _addressRepository: AddressRepository,
  ) {}

  /**
   * Retrieves a customer by its ID.
   * @param id – The ID of the customer to retrieve
   */
  async getCustomerById(id: string): Promise<CustomerDto | null> {
    const customer = await this._customerRepository.findCustomerById(id);
    return customer ? this.mapToDto(customer) : null;
  }

  /**
   * Retrieves all customers.
   */
  async getAllCustomers(): Promise<CustomerDto[]> {
    const customers = await this._customerRepository.findAllCustomers();
    return customers.map((c) => this.mapToDto(c));
  }

  /**
   * Deletes a customer by its ID.
   * @param id – The ID of the customer to delete
   */
  async deleteCustomerById(id: string): Promise<boolean> {
    const customer = await this._customerRepository.findCustomerById(id);
    if (!customer) return false;
    await this._customerRepository.deleteCustomerById(id);
    return true;
  }

  /**
   * Updates an existing customer.
   * @param id – The ID of the customer to update
   * @param updates – Partial DTO with fields to update
   */
  async updateCustomer(
    id: string,
    updates: UpdateCustomerDto,
  ): Promise<CustomerDto | null> {
    const customer = await this._customerRepository.findCustomerById(id);
    if (!customer) return null;


    if (updates.defaultShippingAddressId) {
      const shippingAddress = await this._addressRepository.findAddressById(updates.defaultShippingAddressId);
      if (!shippingAddress) return null;
      customer.defaultShippingAddress = shippingAddress;
    }

    if (updates.defaultBillingAddressId) {
      const billingAddress = await this._addressRepository.findAddressById(updates.defaultBillingAddressId);
      if (!billingAddress) return null;
      customer.defaultBillingAddress = billingAddress;
    }

    const updated = Object.assign(customer, updates);
    const saved   = await this._customerRepository.saveCustomer(updated);

    return this.mapToDto(saved);
  }

  /**
   * Creates a new customer.
   * @param dto – The CustomerDto containing customer details
   */
  async createCustomer(dto: CustomerDto): Promise<CustomerEntity> {
    const customer = new CustomerEntity();
    customer.name = dto.name;
    customer.email = dto.email;

    const shippingAddress = await this._addressRepository.findAddressById(dto.defaultShippingAddressId);
    if (!shippingAddress) return null;
    customer.defaultShippingAddress = shippingAddress;

    const billingAddress = await this._addressRepository.findAddressById(dto.defaultBillingAddressId);
    if (!billingAddress) return null;
    customer.defaultBillingAddress = billingAddress;

    return this._customerRepository.saveCustomer(customer);
  }

  /**
   * Maps a CustomerEntity to a CustomerDto.
   * @param customer – The CustomerEntity to map
   */
  private mapToDto(customer: CustomerEntity): CustomerDto {
    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      defaultShippingAddressId: customer.defaultShippingAddress.id,
      defaultBillingAddressId: customer.defaultBillingAddress.id,
    };
  }
}
