import { Injectable } from "@nestjs/common";
import { DataSource, DeepPartial } from "typeorm";
import { OrderEntity } from "../entities/order.entity";

@Injectable()
export class OrderRepository {
  private readonly _repository;

  /**
   * Constructor for OrderRepository
   * @param _dataSource - The data source for the repository
   */
  constructor(private readonly _dataSource: DataSource) {
    this._repository = this._dataSource.getRepository(OrderEntity);
  }

  /**
   * Finds an order by its ID.
   * @param id - The ID of the order to find
   */
  async findOrderById(id: string): Promise<OrderEntity | null> {
    return this._repository.findOne({
      where: { id },
      relations: [
        "customer",
        "shippingAddress",
        "billingAddress",
        "items",
      ],
    });
  }

  /**
   * Finds all orders placed by a specific customer.
   * @param customerId - The ID of the customer
   */
  async findOrderByCustomerId(customerId: string): Promise<OrderEntity[]> {
    return this._repository.find({
      where: { customer: { id: customerId } },
      relations: [
        "customer",
        "shippingAddress",
        "billingAddress",
        "items",
      ],
    });
  }

  /**
   * Saves a new order or updates an existing one.
   * @param order - The order data to save
   */
  async saveOrder(order: DeepPartial<OrderEntity>): Promise<OrderEntity> {
    const created = this._repository.create(order);
    return this._repository.save(created);
  }

  /**
   * Deletes an order by its ID.
   * @param id - The ID of the order to delete
   */
  async deleteOrderById(id: string): Promise<void> {
    await this._repository.delete(id);
  }
}