import { Test, TestingModule } from "@nestjs/testing";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";
import { CustomerDto } from "./dtos/customer.dto";
import { UpdateCustomerDto } from "./dtos/update-customer.dto";
import { NotFoundException, ForbiddenException } from "@nestjs/common";
import { CustomerEntity } from "./entities/customer.entity";

describe("CustomerController", () => {
  let controller: CustomerController;
  let service: jest.Mocked<CustomerService>;

  const mockCustomer: CustomerDto = {
    id: "1",
    name: "Alice",
    email: "alice@example.com",
    defaultShippingAddressId: "addr1",
    defaultBillingAddressId: "addr2",
  };

  const updatedCustomer: CustomerDto = {
    ...mockCustomer,
    name: "Alice Updated",
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        {
          provide: CustomerService,
          useValue: {
            getCustomerById: jest.fn(),
            getAllCustomers: jest.fn(),
            createCustomer: jest.fn(),
            updateCustomer: jest.fn(),
            deleteCustomerById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
    service = module.get(CustomerService);
  });

  describe("getCustomerById", () => {
    it("should return a customer if found", async () => {
      service.getCustomerById.mockResolvedValue(mockCustomer);
      const result = await controller.getCustomerById("1");
      expect(result).toEqual(mockCustomer);
    });

    it("should throw NotFoundException if customer not found", async () => {
      service.getCustomerById.mockResolvedValue(null);
      await expect(controller.getCustomerById("99")).rejects.toThrow(NotFoundException);
    });
  });

  describe("getAllCustomers", () => {
    it("should return a list of customers", async () => {
      service.getAllCustomers.mockResolvedValue([mockCustomer]);
      const result = await controller.getAllCustomers();
      expect(result).toEqual([mockCustomer]);
    });
  });

  describe("createCustomer", () => {
    it("should return created customer entity", async () => {
      const mockEntity: CustomerEntity = {
        ...mockCustomer,
        defaultShippingAddress: null,
        defaultBillingAddress: null,
        orders: [],
        addresses: [],
      };
      service.createCustomer.mockResolvedValue(mockEntity);
      const result = await controller.createCustomer(mockCustomer);
      expect(result).toEqual(mockEntity);
    });

    it("should throw ForbiddenException if creation fails", async () => {
      service.createCustomer.mockResolvedValue(null);
      await expect(controller.createCustomer(mockCustomer)).rejects.toThrow(ForbiddenException);
    });
  });

  describe("updateCustomer", () => {
    it("should return updated customer", async () => {
      service.updateCustomer.mockResolvedValue(updatedCustomer);
      const result = await controller.updateCustomer("1", {
        name: "Alice Updated",
      } as UpdateCustomerDto);
      expect(result).toEqual(updatedCustomer);
    });

    it("should throw NotFoundException if customer not found", async () => {
      service.updateCustomer.mockResolvedValue(null);
      await expect(
        controller.updateCustomer("99", { name: "Does not exist" }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe("deleteCustomerById", () => {
    it("should return void if deletion successful", async () => {
      service.deleteCustomerById.mockResolvedValue(true);
      await expect(controller.deleteCustomer("1")).resolves.toEqual({ deleted: true });
    });

    it("should throw NotFoundException if deletion fails", async () => {
      service.deleteCustomerById.mockResolvedValue(false);
      await expect(controller.deleteCustomer("99")).rejects.toThrow(NotFoundException);
    });
  });
});
