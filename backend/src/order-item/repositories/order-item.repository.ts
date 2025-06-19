import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { OrderItemEntity } from "../entities/order-item.entity";

@Injectable()
export class OrderItemRepository {
      private readonly _treeRepo;

  constructor(private readonly _dataSource: DataSource) {
    this._treeRepo = this._dataSource.getTreeRepository(OrderItemEntity);
  }

}