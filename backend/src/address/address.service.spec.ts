import { Test, TestingModule } from "@nestjs/testing";
import { AddressService } from "./address.service";
import { AddressRepository } from "./repositories/address.repository";
import { AddressEntity } from "./entities/address.entity";
import { CustomerRepository } from "src/customer/repositories/customer.repository";
import { CustomerEntity } from "src/customer/entities/customer.entity";
import { UpdateAddressDto } from "./dtos/update-address.dto";
import { AddressDto } from "./dtos/address.dto";

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

    it("should return null when address is not found", async () => {
      addressRepository.findAddressById.mockResolvedValue(null);

      const result = await service.getAddressById("999");

      expect(result).toBeNull();
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

    it("should return false when address is not found", async () => {
      addressRepository.findAddressById.mockResolvedValue(null);

      const result = await service.deleteAddressById("999");

      expect(result).toBe(false);
      expect(addressRepository.findAddressById).toHaveBeenCalledWith("999");
      expect(addressRepository.deleteAddressById).not.toHaveBeenCalled();
    });
  });

  describe("getAddresssByCustomerId", () => {
    it("should return addresses for a given customer", async () => {
      addressRepository.findAddressByCustomer.mockResolvedValue([
      mockAddress as AddressEntity,
      ]);

      const result = await service.getAddressByCustomerId("1");

      expect(result).toEqual([
        {
          id: "1",
          street: "2 rue qql",
          city: "Bordeaux",
          zipCode: "33800",
          country: "France",
          addressType: "Shipping",
          customerId: "1",
        },
      ]);
      expect(addressRepository.findAddressByCustomer).toHaveBeenCalledWith("1");
    });
  });

    describe("createAddress", () => {
    it("should create an address", async () => {
      const dto = {
        id: "1",
        street: "2 rue qql",
        city: "Bordeaux",
        zipCode: "33800",
        country: "France",
        addressType: "Shipping",
        customerId: "1",
      };
      customerRepository.findCustomerById.mockResolvedValue(
        mockCustomer as CustomerEntity,
      );
      addressRepository.saveAddress.mockResolvedValue(
        mockAddress as AddressEntity,
      );

      const result = await service.createAddress(dto as AddressDto);

      expect(result).toEqual({
        id: "1",
        street: "2 rue qql",
        city: "Bordeaux",
        zipCode: "33800",
        country: "France",
        addressType: "Shipping",
        customerId: "1",
      });
      expect(addressRepository.saveAddress).toHaveBeenCalled();
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

      const result = await service.updateAddress("1", updates as UpdateAddressDto);

      expect(result.city).toEqual("New York");
      expect(addressRepository.saveAddress).toHaveBeenCalled();
    });

    it("should return null when address is not found", async () => {
      addressRepository.findAddressById.mockResolvedValue(null);

      const updates = { city: "New York" } as UpdateAddressDto;
      const result = await service.updateAddress("999", updates);

      expect(result).toBeNull();
      expect(addressRepository.findAddressById).toHaveBeenCalledWith("999");
      expect(addressRepository.saveAddress).not.toHaveBeenCalled();
    });
  });

    it("should return null when customer is not found", async () => {
      const dto: AddressDto = {
        id: "1",
        street: "3 rue qql",
        city: "Allençons",
        zipCode: "44400",
        country: "France",
        addressType: "Shipping",
        customerId: "999",
      };

      customerRepository.findCustomerById.mockResolvedValue(null);

      const result = await service.createAddress(dto);

      expect(result).toBeNull();
      expect(customerRepository.findCustomerById).toHaveBeenCalledWith("999");
      expect(addressRepository.saveAddress).not.toHaveBeenCalled();
    });
  });
});
