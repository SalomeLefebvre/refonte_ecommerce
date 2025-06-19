import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { CustomerEntity } from "../entities/customer.entity";

@Injectable()
export class CustomerRepository {
      private readonly _treeRepo;

  constructor(private readonly _dataSource: DataSource) {
    this._treeRepo = this._dataSource.getTreeRepository(CustomerEntity);
  }

}