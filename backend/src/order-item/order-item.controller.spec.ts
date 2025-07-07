import { Test, TestingModule } from "@nestjs/testing";
import { OrderItemController } from "./order-item.controller";
import { OrderItemService } from "./order-item.service";
import { OrderItemDto } from "./dtos/order-item.dto";
import { UpdateOrderItemDto } from "./dtos/update-order-item.dto";
import { NotFoundException, ForbiddenException } from "@nestjs/common";

describe("OrderItemController", () => {
  let controller: OrderItemController;
  let service: jest.Mocked<OrderItemService>;

  const mockOrderItem: OrderItemDto = {
    id: "1",
    orderId: "order1",
    productId: "prod1",
    quantity: 2,
    unitPrice: "10.0",
    carrierId: "1",
    totalPrice: "15.0",
  };

  const updatedOrderItem: OrderItemDto = {
    ...mockOrderItem,
    quantity: 3,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderItemController],
      providers: [
        {
          provide: OrderItemService,
          useValue: {
            getOrderItemById: jest.fn(),
            getOrderItemsByOrderId: jest.fn(),
            createOrderItem: jest.fn(),
            updateOrderItem: jest.fn(),
            deleteOrderItemById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OrderItemController>(OrderItemController);
    service = module.get(OrderItemService);
  });

  describe("getOrderItemById", () => {
    it("should return an order item if found", async () => {
      service.getOrderItemById.mockResolvedValue(mockOrderItem);
      const result = await controller.getOrderItemById("1");
      expect(result).toEqual(mockOrderItem);
    });

    it("should throw NotFoundException if not found", async () => {
      service.getOrderItemById.mockResolvedValue(null);
      await expect(controller.getOrderItemById("99")).rejects.toThrow(NotFoundException);
    });
  });

  describe("getOrderItemsByOrderId", () => {
    it("should return list of order items for given order", async () => {
      service.getOrderItemsByOrderId.mockResolvedValue([mockOrderItem]);
      const result = await controller.getOrderItemsByOrderId("order1");
      expect(result).toEqual([mockOrderItem]);
    });
  });

  describe("createOrderItem", () => {
    it("should return created order item", async () => {
      service.createOrderItem.mockResolvedValue(mockOrderItem);
      const result = await controller.createOrderItem(mockOrderItem);
      expect(result).toEqual(mockOrderItem);
    });

    it("should throw ForbiddenException if creation fails", async () => {
      service.createOrderItem.mockResolvedValue(null);
      await expect(controller.createOrderItem(mockOrderItem)).rejects.toThrow(ForbiddenException);
    });
  });

  describe("updateOrderItem", () => {
    it("should return updated order item", async () => {
      service.updateOrderItem.mockResolvedValue(updatedOrderItem);
      const result = await controller.updateOrderItem("1", {
        quantity: 3,
      } as UpdateOrderItemDto);
      expect(result).toEqual(updatedOrderItem);
    });

    it("should throw NotFoundException if update fails", async () => {
      service.updateOrderItem.mockResolvedValue(null);
      await expect(
        controller.updateOrderItem("99", { quantity: 1 } as UpdateOrderItemDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe("deleteOrderItem", () => {
    it("should return { deleted: true } if deletion successful", async () => {
      service.deleteOrderItemById.mockResolvedValue(true);
      const result = await controller.deleteOrderItem("1");
      expect(result).toEqual({ deleted: true });
    });

    it("should throw NotFoundException if deletion fails", async () => {
      service.deleteOrderItemById.mockResolvedValue(false);
      await expect(controller.deleteOrderItem("99")).rejects.toThrow(NotFoundException);
    });
  });
});
