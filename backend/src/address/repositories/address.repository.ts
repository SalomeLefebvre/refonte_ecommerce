import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { AddressEntity } from "../entities/address.entity";

@Injectable()
export class AddressRepository {
      private readonly _treeRepo;

  constructor(private readonly _dataSource: DataSource) {
    this._treeRepo = this._dataSource.getTreeRepository(AddressEntity);
  }

}