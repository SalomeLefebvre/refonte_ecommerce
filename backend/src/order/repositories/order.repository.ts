import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { OrderEntity } from "../entities/order.entity";

@Injectable()
export class OrderRepository {
  private readonly _treeRepo;

  /**
   *
   */
  constructor(private readonly _dataSource: DataSource) {
    this._treeRepo = this._dataSource.getTreeRepository(OrderEntity);
  }
}
