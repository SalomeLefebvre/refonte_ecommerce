import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { CustomerEntity } from "../entities/customer.entity";

@Injectable()
export class CustomerRepository {
  private readonly _repository;

  /**
   *
   */
  constructor(private readonly _dataSource: DataSource) {
    this._repository = this._dataSource.getTreeRepository(CustomerEntity);
  }

  /**
   *
   */
  async findCustomerById(customerId: string): Promise<CustomerEntity | null> {
    return this._repository.findOne({
      where: { id: customerId },
      relations: ["address", "order"],
    });
  }
}
