import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { AddressService } from "./address.service";
import { AddressDto } from "./dtos/address.dto";
import { UpdateAddressDto } from "./dtos/update-address.dto";

@Controller("address")
export class AddressController {
 constructor(private readonly _addressService: AddressService) { }

 @Get(":id")
  async getAddressById(@Param("id") id: string): Promise<AddressDto> {
    return this._addressService.getAddressById(id);
  }

  @Get("customer/:customerId")
  async getAddresByCustomerId(@Param("customerId") customerId: string): Promise<AddressDto[]> {
    const address = await this._addressService.getAddresssByCustomerId(customerId);
    return address.map((address) => ({
      id: address.id,
      street: address.street,
      city: address.city,
      zipCode: address.zipCode,
      country: address.country,
      addressType: address.addressType,
      customerId: address.customer.id,
    }));
  }

  @Post()
  async createAddress(@Body() dto: AddressDto): Promise<AddressDto> {
    const address = await this._addressService.createAddress(dto);
    return {
      ...address,
      customerId: address.customer.id ?? dto.customerId,
    };
  }

  @Patch(":id")
  async patchAddress(@Param("id") id: string, @Body() dto: UpdateAddressDto): Promise<AddressDto> {
    return this._addressService.updateAddress(id, dto);
  }

  @Delete(":id")
  async deleteAddressById(@Param("id") id: string): Promise<void> {
    return this._addressService.deleteAddressById(id);
  }
}