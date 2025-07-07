import { Test, TestingModule } from "@nestjs/testing";
import { OrderItemService } from "./order-item.service";
import { OrderItemRepository } from "./repositories/order-item.repository";
import { OrderItemEntity } from "./entities/order-item.entity";
import { OrderItemDto } from "./dtos/order-item.dto";
import { UpdateOrderItemDto } from "./dtos/update-order-item.dto";
import { OrderEntity } from "src/order/entities/order.entity";

describe("OrderItemService", () => {
  let service: OrderItemService;
  let repository: jest.Mocked<OrderItemRepository>;

  const mockEntity: OrderItemEntity = {
    id: "1",
    productId: "p1",
    carrierId: "c1",
    quantity: 2,
    unitPrice: "10.0",
    totalPrice: "20.0",
    order: { id: "o1" } as OrderEntity,
  };

  const mockDto: OrderItemDto = {
    id: "1",
    productId: "p1",
    carrierId: "c1",
    quantity: 2,
    unitPrice: "10.0",
    totalPrice: "20.0",
    orderId: "o1",
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderItemService,
        {
          provide: OrderItemRepository,
          useValue: {
            findOrderItemById: jest.fn(),
            findOrderItemByOrderId: jest.fn(),
            saveOrderItem: jest.fn(),
            deleteByIdOrderItem: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(OrderItemService);
    repository = module.get(OrderItemRepository);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("getOrderItemById", () => {
    it("should return an item if found", async () => {
      repository.findOrderItemById.mockResolvedValueOnce(mockEntity);
      const result = await service.getOrderItemById("1");
      expect(result).toEqual(mockDto);
    });

    it("should return null if item not found", async () => {
      repository.findOrderItemById.mockResolvedValueOnce(null);
      const result = await service.getOrderItemById("404");
      expect(result).toBeNull();
    });
  });

  describe("getOrderItemsByOrderId", () => {
    it("should return items for a given order", async () => {
      repository.findOrderItemByOrderId.mockResolvedValueOnce([mockEntity]);
      const result = await service.getOrderItemsByOrderId("o1");
      expect(result).toEqual([mockDto]);
    });
  });

  describe("createOrderItem", () => {
    it("should create and return an order item", async () => {
      repository.saveOrderItem.mockResolvedValueOnce(mockEntity);
      const result = await service.createOrderItem(mockDto);
      expect(result).toEqual(mockDto);
    });
  });

  describe("updateOrderItem", () => {
    it("should update and return the item", async () => {
      const updates: UpdateOrderItemDto = { quantity: 3, totalPrice: "30.0" };
      repository.findOrderItemById.mockResolvedValueOnce(mockEntity);
      repository.saveOrderItem.mockResolvedValueOnce({
        ...mockEntity,
        ...updates,
      });
      const result = await service.updateOrderItem("1", updates);
      expect(result).toEqual({
        ...mockDto,
        ...updates,
      });
    });

    it("should return null if item not found", async () => {
      repository.findOrderItemById.mockResolvedValueOnce(null);
      const result = await service.updateOrderItem("404", { quantity: 2 });
      expect(result).toBeNull();
    });
  });

  describe("deleteOrderItemById", () => {
    it("should delete and return true if item exists", async () => {
      repository.findOrderItemById.mockResolvedValueOnce(mockEntity);
      repository.deleteByIdOrderItem.mockResolvedValueOnce(undefined);
      const result = await service.deleteOrderItemById("1");
      expect(result).toBe(true);
    });

    it("should return false if item not found", async () => {
      repository.findOrderItemById.mockResolvedValueOnce(null);
      const result = await service.deleteOrderItemById("404");
      expect(result).toBe(false);
    });
  });
});
