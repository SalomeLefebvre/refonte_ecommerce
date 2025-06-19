import { Test, TestingModule } from "@nestjs/testing";
import { NotFoundException, ForbiddenException } from "@nestjs/common";
import { AddressService } from "./address.service";
import { AddressRepository } from "./repositories/address.repository";
import { AddressEntity } from "./entities/address.entity";
import { CustomerRepository } from "src/customer/repositories/customer.repository";
import { CustomerEntity } from "src/customer/entities/customer.entity";

describe("AddressService", () => {
  let service: AddressService;
  let addressRepository: jest.Mocked<AddressRepository>;
  let customerRepository: jest.Mocked<CustomerRepository>;

  const mockAddress: Partial<AddressEntity> = {
    id: "1",
    street: "2 rue qql",
    city: "Bordeaux",
    zipCode: "33800",
    country: "France",
    addressType: "Shipping",
    customer: { id: "1" } as CustomerEntity,
  };

  const mockCustomer: Partial<CustomerEntity> = {
    id: "1",
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: AddressRepository,
          useValue: {
            findAddressById: jest.fn(),
            findAddressByCustomer: jest.fn(),
            deleteAddressById: jest.fn(),
            saveAddress: jest.fn(),
          },
        },
        {
          provide: CustomerRepository,
          useValue: {
            findCustomerById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    addressRepository = module.get(AddressRepository);
    customerRepository = module.get(CustomerRepository);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("AddressById", () => {
    it("should return an address when found", async () => {
      addressRepository.findAddressById.mockResolvedValue(
        mockAddress as AddressEntity,
      );

      const result = await service.getAddressById("1");

      expect(result).toEqual({
        id: "1",
        street: "2 rue qql",
        city: "Bordeaux",
        zipCode: "33800",
        country: "France",
        addressType: "Shipping",
        customerId: "1",
      });
      expect(addressRepository.findAddressById).toHaveBeenCalledWith("1");
    });

    it("should throw NotFoundException when address is not found", async () => {
      addressRepository.findAddressById.mockResolvedValue(null);

      await expect(service.getAddressById("999")).rejects.toThrow(NotFoundException);
      expect(addressRepository.findAddressById).toHaveBeenCalledWith("999");
    });
  });

  describe("deleteUserShortcutById", () => {
    it("should delete a address when found", async () => {
      addressRepository.findAddressById.mockResolvedValue(
        mockAddress as AddressEntity,
      );

      await service.deleteAddressById("1");

      expect(addressRepository.deleteAddressById).toHaveBeenCalledWith("1");
    });

    it("should throw ForbiddenException when id is missing", async () => {
      await expect(service.deleteAddressById("")).rejects.toThrow(ForbiddenException);
    });

    it("should throw NotFoundException when user shortcut is not found", async () => {
      addressRepository.findAddressById.mockResolvedValue(null);

      await expect(service.deleteAddressById("999")).rejects.toThrow(NotFoundException);
    });
  });

  describe("updateAddress", () => {
    it("should update a user shortcut when found", async () => {
      const updates = { city: "New York" };
      addressRepository.findAddressById.mockResolvedValue(
        mockAddress as AddressEntity,
      );
      addressRepository.saveAddress.mockResolvedValue({
        ...mockAddress,
        ...updates,
      } as AddressEntity);

      const result = await service.updateAddress("1", updates as any);

      expect(result.city).toEqual("New York");
      expect(addressRepository.saveAddress).toHaveBeenCalled();
    });

    it("should throw ForbiddenException when id is missing", async () => {
      await expect(service.updateAddress("", {} as any)).rejects.toThrow(ForbiddenException);
    });

    it("should throw NotFoundException when user shortcut is not found", async () => {
      addressRepository.findAddressById.mockResolvedValue(null);

      await expect(service.updateAddress("999", {} as any)).rejects.toThrow(NotFoundException);
    });
  });

  describe("createAddress", () => {
    it("should create an address", async () => {
      const dto = {
        id: "1",
        street: "3 rue qql",
        city: "Allençons",
        zipCode: "44400",
        country: "France",
        addressType: "Shipping",
        userId: "1",
      };
      customerRepository.findCustomerById.mockResolvedValue(mockCustomer as CustomerEntity);
      addressRepository.saveAddress.mockResolvedValue(mockAddress as AddressEntity);

      const result = await service.createAddress(dto as any);

      expect(result).toEqual(mockAddress);
      expect(addressRepository.saveAddress).toHaveBeenCalled();
    });

    it("should throw ForbiddenException when user is not valid", async () => {
      const dto = {
        id: "1",
        street: "3 rue qql",
        city: "Allençons",
        zipCode: "44400",
        country: "France",
        addressType: "Shipping",
        userId: "1",
      };
      customerRepository.findCustomerById.mockResolvedValue(null);

      await expect(service.createAddress(dto as any)).rejects.toThrow(ForbiddenException);
    });
  });
});

