import { Injectable } from "@nestjs/common";
import { DataSource, DeepPartial } from "typeorm";
import { OrderItemEntity } from "../entities/order-item.entity";

@Injectable()
export class OrderItemRepository {
  private readonly _repository;

  /**
   * Constructor for OrderItemRepository
   * @param _dataSource - The data source for the repository
   */
  constructor(private readonly _dataSource: DataSource) {
    this._repository = this._dataSource.getRepository(OrderItemEntity);
  }

  /**
   * Finds an order item by its ID.
   * @param id - The ID of the order item to find
   */
  async findOrderItemById(id: string): Promise<OrderItemEntity | null> {
    return this._repository.findOne({
      where: { id },
      relations: ["order"],
    });
  }

  /**
   * Finds all items for a specific order.
   * @param orderId - The ID of the order
   */
  async findOrderItemByOrderId(orderId: string): Promise<OrderItemEntity[]> {
    return this._repository.find({
      where: { order: { id: orderId } },
      relations: ["order"],
    });
  }

  /**
   * Saves a new order item or updates an existing one.
   * @param item - The item data to save
   */
  async saveOrderItem(item: DeepPartial<OrderItemEntity>): Promise<OrderItemEntity> {
    const created = this._repository.create(item);
    return this._repository.save(created);
  }

  /**
   * Deletes an order item by its ID.
   * @param id - The ID of the order item to delete
   */
  async deleteByIdOrderItem(id: string): Promise<void> {
    await this._repository.delete(id);
  }
}