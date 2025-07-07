import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { OrderItemService } from "./order-item.service";
import { OrderItemDto } from "./dtos/order-item.dto";
import { UpdateOrderItemDto } from "./dtos/update-order-item.dto";

@Controller("order-items")
export class OrderItemController {
  /**
   *
   */
  constructor(private readonly _orderItemService: OrderItemService) {}

  /**
   * Retrieves an order item by its ID.
   * @param id - The ID of the order item
   */
  @Get(":id")
  async getOrderItemById(@Param("id") id: string): Promise<OrderItemDto> {
    const item = await this._orderItemService.getOrderItemById(id);
    if (!item)
      throw new NotFoundException(`Order item with ID ${id} not found`);

    return item;
  }

  /**
   * Retrieves all items for a specific order.
   * @param orderId - The ID of the order
   */
  @Get("order/:orderId")
  async getOrderItemsByOrderId(
    @Param("orderId") orderId: string,
  ): Promise<OrderItemDto[]> {
    return this._orderItemService.getOrderItemsByOrderId(orderId);
  }

  /**
   * Creates a new order item.
   * @param dto - The OrderItemDto containing order item details
   */
  @Post()
  async createOrderItem(@Body() dto: OrderItemDto): Promise<OrderItemDto> {
    const created = await this._orderItemService.createOrderItem(dto);
    if (!created)
      throw new ForbiddenException("Invalid data for creating order item");

    return created;
  }

  /**
   * Updates an existing order item.
   * @param id - The ID of the order item
   * @param updates - Fields to update
   */
  @Put(":id")
  async updateOrderItem(
    @Param("id") id: string,
    @Body() updates: UpdateOrderItemDto,
  ): Promise<OrderItemDto> {
    const updated = await this._orderItemService.updateOrderItem(id, updates);
    if (!updated)
      throw new NotFoundException(`Order item with ID ${id} not found`);

    return updated;
  }

  /**
   * Deletes an order item by its ID.
   * @param id - The ID of the order item
   */
  @Delete(":id")
  async deleteOrderItem(
    @Param("id") id: string,
  ): Promise<{ deleted: boolean }> {
    const result = await this._orderItemService.deleteOrderItemById(id);
    if (!result)
      throw new NotFoundException(`Order item with ID ${id} not found`);

    return { deleted: true };
  }
}