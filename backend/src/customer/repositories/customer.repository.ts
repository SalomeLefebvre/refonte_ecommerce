import { Injectable } from "@nestjs/common";
import { DataSource, DeepPartial } from "typeorm";
import { CustomerEntity } from "../entities/customer.entity";

@Injectable()
export class CustomerRepository {
  private readonly _repository;

  /**
   * Constructor for CustomerRepository
   * @param _dataSource - The data source for the repository
   */
  constructor(private readonly _dataSource: DataSource) {
    this._repository = this._dataSource.getRepository(CustomerEntity);
  }

  /**
   * Finds a customer by their ID.
   * @param customerId - The ID of the customer to find
   */
  async findCustomerById(customerId: string): Promise<CustomerEntity | null> {
    return this._repository.findOne({
      where: { id: customerId },
      relations: [
        "order",
        "address",
      ],
    });
  }

  /**
   * Finds all customers.
   */
  async findAllCustomers(): Promise<CustomerEntity[]> {
    return this._repository.find({
      relations: [
        "order",
        "address",
      ],
    });
  }

  /**
   * Saves a new customer or updates an existing one.
   * @param customer - The customer data to save
   */
  async saveCustomer(customer: DeepPartial<CustomerEntity>) {
    const customerData = this._repository.create(customer);
    return this._repository.save(customerData);
  }

  /**
   * Deletes a customer by their ID.
   * @param id - The ID of the customer to delete
   */
  async deleteCustomerById(id: string): Promise<void> {
    await this._repository.delete(id);
  }
}