import { Test, TestingModule } from "@nestjs/testing";
import { AddressController } from "./address.controller";
import { AddressService } from "./address.service";
import { NotFoundException } from "@nestjs/common";
import { AddressDto } from "./dtos/address.dto";
import { UpdateAddressDto } from "./dtos/update-address.dto";

describe("AddressController", () => {
  let controller: AddressController;
  let service: jest.Mocked<AddressService>;

  const mockAddress: AddressDto = {
    id: "1",
    street: "2 rue qql",
    city: "Bordeaux",
    zipCode: "33800",
    country: "France",
    addressType: "Shipping",
    customerId: "1",
  };

  const mockUpdatedAddress: AddressDto = {
    ...mockAddress,
    city: "New York",
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressController],
      providers: [
        {
          provide: AddressService,
          useValue: {
            getAddressById: jest.fn(),
            getAddressByCustomerId: jest.fn(),
            createAddress: jest.fn(),
            updateAddress: jest.fn(),
            deleteAddressById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AddressController>(AddressController);
    service = module.get(AddressService);
  });

  describe("getAddressById", () => {
    it("should return an address if found", async () => {
      service.getAddressById.mockResolvedValue(mockAddress);
      const result = await controller.getAddressById("1");
      expect(result).toEqual(mockAddress);
    });

    it("should throw NotFoundException if address not found", async () => {
      service.getAddressById.mockResolvedValue(null);
      await expect(controller.getAddressById("99")).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("getAddressByCustomerId", () => {
    it("should return an array of address DTOs", async () => {
      const mockAddress = {
        id: "1",
        street: "2 rue qql",
        city: "Bordeaux",
        zipCode: "33800",
        country: "France",
        addressType: "Shipping",
        customerId: "1",
      };
      service.getAddressByCustomerId.mockResolvedValue([mockAddress]);

      const result = await controller.getAddresByCustomerId("1");
      expect(result).toEqual([mockAddress]);
    });
  });

  describe("createAddress", () => {
    it("should return created address if valid", async () => {
      const createdWithCustomer: AddressDto = {
        id: "1",
        street: "2 rue qql",
        city: "Bordeaux",
        zipCode: "33800",
        country: "France",
        addressType: "Shipping",
        customerId: "1",
      };

      jest.spyOn(service, "createAddress").mockResolvedValue(createdWithCustomer);

      const result = await controller.createAddress({
        id: "1",
        street: "2 rue qql",
        city: "Bordeaux",
        zipCode: "33800",
        country: "France",
        addressType: "Shipping",
        customerId: "1",
      });

      expect(result).toEqual(createdWithCustomer);
    });

    it("should throw NotFoundException if customer is not valid", async () => {
      service.createAddress.mockResolvedValue(null);
      await expect(controller.createAddress(mockAddress)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("patchAddress", () => {
    it("should return updated address if found", async () => {
      service.updateAddress.mockResolvedValue(mockUpdatedAddress);
      const result = await controller.patchAddress("1", {
        city: "New York",
      } as UpdateAddressDto);
      expect(result).toEqual(mockUpdatedAddress);
    });

    it("should throw NotFoundException if address is not found", async () => {
      service.updateAddress.mockResolvedValue(null);
      await expect(
        controller.patchAddress("99", { city: "Nowhere" } as UpdateAddressDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe("deleteAddressById", () => {
    it("should return void if deletion successful", async () => {
      service.deleteAddressById.mockResolvedValue(true);
      await expect(controller.deleteAddressById("1")).resolves.toBeUndefined();
    });

    it("should throw NotFoundException if address not found", async () => {
      service.deleteAddressById.mockResolvedValue(false);
      await expect(controller.deleteAddressById("99")).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
