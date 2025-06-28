import { Test, TestingModule } from "@nestjs/testing";
import { CustomerService } from "./customer.service";
import { CustomerRepository } from "./repositories/customer.repository";
import { AddressRepository } from "src/address/repositories/address.repository";
import { CustomerEntity } from "./entities/customer.entity";
import { AddressEntity } from "src/address/entities/address.entity";
import { UpdateCustomerDto } from "./dtos/update-customer.dto";
import { CustomerDto } from "./dtos/customer.dto";

describe("CustomerService", () => {
  let service: CustomerService;
  let customerRepository: jest.Mocked<CustomerRepository>;
  let addressRepository: jest.Mocked<AddressRepository>;

  const mockCustomerEntity: Partial<CustomerEntity> = {
    id: "1",
    name: "Jane Doe",
    email: "jane@example.com",
    defaultShippingAddress: { id: "10" } as AddressEntity,
    defaultBillingAddress: { id: "11" } as AddressEntity,
  };

  const mockCustomerDto: CustomerDto = {
    id: "1",
    name: "Jane Doe",
    email: "jane@example.com",
    defaultShippingAddressId: "10",
    defaultBillingAddressId: "11",
  };

  const mockShippingAddress: Partial<AddressEntity> = {
    id: "10",
  };

  const mockBillingAddress: Partial<AddressEntity> = {
    id: "11",
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: CustomerRepository,
          useValue: {
            findCustomerById: jest.fn(),
            findAllCustomers: jest.fn(),
            deleteCustomerById: jest.fn(),
            saveCustomer: jest.fn(),
          },
        },
        {
          provide: AddressRepository,
          useValue: {
            findAddressById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(CustomerService);
    customerRepository = module.get(CustomerRepository);
    addressRepository = module.get(AddressRepository);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("getCustomerById", () => {
    it("should return a customer DTO if found", async () => {
      customerRepository.findCustomerById.mockResolvedValue(
        mockCustomerEntity as CustomerEntity,
      );
      const result = await service.getCustomerById("1");
      expect(result).toEqual(mockCustomerDto);
    });

    it("should return null if customer not found", async () => {
      customerRepository.findCustomerById.mockResolvedValue(null);
      const result = await service.getCustomerById("99");
      expect(result).toBeNull();
    });
  });

  describe("getAllCustomers", () => {
    it("should return an array of customer DTOs", async () => {
      customerRepository.findAllCustomers.mockResolvedValue([
        mockCustomerEntity as CustomerEntity,
      ]);
      const result = await service.getAllCustomers();
      expect(result).toEqual([mockCustomerDto]);
    });
  });

  describe("deleteCustomerById", () => {
    it("should return true if customer is found and deleted", async () => {
      customerRepository.findCustomerById.mockResolvedValue(
        mockCustomerEntity as CustomerEntity,
      );
      customerRepository.deleteCustomerById.mockResolvedValue(undefined);
      const result = await service.deleteCustomerById("1");
      expect(result).toBe(true);
    });

    it("should return false if customer is not found", async () => {
      customerRepository.findCustomerById.mockResolvedValue(null);
      const result = await service.deleteCustomerById("99");
      expect(result).toBe(false);
    });
  });

  describe("updateCustomer", () => {
    it("should update and return customer DTO if valid", async () => {
      const updates: UpdateCustomerDto = {
        name: "New Name",
        defaultShippingAddressId: "10",
        defaultBillingAddressId: "11",
      };

      customerRepository.findCustomerById.mockResolvedValue(
        mockCustomerEntity as CustomerEntity,
      );
      addressRepository.findAddressById.mockResolvedValueOnce(
        mockShippingAddress as AddressEntity,
      );
      addressRepository.findAddressById.mockResolvedValueOnce(
        mockBillingAddress as AddressEntity,
      );

      const updatedCustomer: CustomerEntity = {
        ...(mockCustomerEntity as CustomerEntity),
        ...updates,
      };
      customerRepository.saveCustomer.mockResolvedValue(updatedCustomer);

      const result = await service.updateCustomer("1", updates);
      expect(result).toEqual(mockCustomerDto);
    });

    it("should return null if customer is not found", async () => {
      customerRepository.findCustomerById.mockResolvedValue(null);
      const result = await service.updateCustomer("99", {
        name: "Ghost",
      });
      expect(result).toBeNull();
    });

    it("should return null if shipping address is invalid", async () => {
      customerRepository.findCustomerById.mockResolvedValue(
        mockCustomerEntity as CustomerEntity,
      );
      addressRepository.findAddressById.mockResolvedValueOnce(null);
      const result = await service.updateCustomer("1", {
        defaultShippingAddressId: "invalid",
      });
      expect(result).toBeNull();
    });
  });

  describe("createCustomer", () => {
    it("should create and return a new customer entity", async () => {
      const dto: CustomerDto = {
        id: "1",
        name: "Jane Doe",
        email: "jane@example.com",
        defaultShippingAddressId: "10",
        defaultBillingAddressId: "11",
      };

      addressRepository.findAddressById.mockResolvedValueOnce(
        mockShippingAddress as AddressEntity,
      );
      addressRepository.findAddressById.mockResolvedValueOnce(
        mockBillingAddress as AddressEntity,
      );

      customerRepository.saveCustomer.mockResolvedValue(
        mockCustomerEntity as CustomerEntity,
      );

      const result = await service.createCustomer(dto);
      expect(result).toEqual(mockCustomerEntity);
    });

    it("should return null if shipping address is not found", async () => {
      addressRepository.findAddressById.mockResolvedValueOnce(null);
      const result = await service.createCustomer(mockCustomerDto);
      expect(result).toBeNull();
    });

    it("should return null if billing address is not found", async () => {
      addressRepository.findAddressById
        .mockResolvedValueOnce(mockShippingAddress as AddressEntity)
        .mockResolvedValueOnce(null);
      const result = await service.createCustomer(mockCustomerDto);
      expect(result).toBeNull();
    });
  });
});
