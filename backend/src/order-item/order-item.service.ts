import { Injectable } from "@nestjs/common";
import { OrderItemRepository } from "./repositories/order-item.repository";
import { OrderItemDto } from "./dtos/order-item.dto";
import { OrderItemEntity } from "./entities/order-item.entity";
import { UpdateOrderItemDto } from "./dtos/update-order-item.dto";

@Injectable()
export class OrderItemService {
  /**
   *
   */
  constructor(private readonly _orderItemRepository: OrderItemRepository) {}

  /**
   * Retrieves an order item by its ID.
   * @param id – The ID of the order item
   */
  async getOrderItemById(id: string): Promise<OrderItemDto | null> {
    const item = await this._orderItemRepository.findOrderItemById(id);
    return item ? this.mapToDto(item) : null;
  }

  /**
   * Retrieves all items for a specific order.
   * @param orderId – The ID of the order
   */
  async getOrderItemsByOrderId(orderId: string): Promise<OrderItemDto[]> {
    const items = await this._orderItemRepository.findOrderItemByOrderId(orderId);
    return items.map((i) => this.mapToDto(i));
  }

  /**
   * Creates a new order item.
   * @param dto – The CreateOrderItemDto containing order item details
   */
  async createOrderItem(dto: OrderItemDto): Promise<OrderItemDto> {
    const saved = await this._orderItemRepository.saveOrderItem(dto);
    return this.mapToDto(saved);
  }

  /**
   * Updates an existing order item.
   * @param id – The ID of the order item
   * @param updates – Partial DTO with fields to update
   */
  async updateOrderItem(id: string, updates: UpdateOrderItemDto): Promise<OrderItemDto | null> {
    const existing = await this._orderItemRepository.findOrderItemById(id);
    if (!existing) return null;

    const merged = Object.assign(existing, updates);
    const saved = await this._orderItemRepository.saveOrderItem(merged);

    return this.mapToDto(saved);
  }

  /**
   * Deletes an order item by its ID.
   * @param id – The ID of the order item
   */
  async deleteOrderItemById(id: string): Promise<boolean> {
    const existing = await this._orderItemRepository.findOrderItemById(id);
    if (!existing) return false;

    await this._orderItemRepository.deleteByIdOrderItem(id);
    return true;
  }

  /**
   * Maps an OrderItemEntity to an OrderItemDto.
   * @param entity – The OrderItemEntity
   */
  private mapToDto(entity: OrderItemEntity): OrderItemDto {
    return {
      id: entity.id,
      productId: entity.productId,
      carrierId: entity.carrierId,
      quantity: entity.quantity,
      unitPrice: entity.unitPrice,
      totalPrice: entity.totalPrice,
      orderId: entity.order.id,
    };
  }
}
