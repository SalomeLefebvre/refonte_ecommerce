import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { AddressService } from "./address.service";
import { AddressDto } from "./dtos/address.dto";
import { UpdateAddressDto } from "./dtos/update-address.dto";

@Controller("address")
export class AddressController {
  /**
   * Constructor for AddressController
   * @param _addressService - Service for managing addresses
   */
  constructor(private readonly _addressService: AddressService) {}

  /**
   * Retrieves an address by its ID.
   * @param id - The ID of the address to retrieve
   */
  @Get(":id")
  async getAddressById(@Param("id") id: string): Promise<AddressDto> {
    const result = await this._addressService.getAddressById(id);
    if (!result) throw new NotFoundException(`Address with id ${id} not found`);
    return result;
  }

  /**
   * Retrieves all addresses associated with a specific customer ID.
   * @param customerId - The ID of the customer whose addresses are to be retrieved
   */
  @Get("customer/:customerId")
  async getAddresByCustomerId(
    @Param("customerId") customerId: string,
  ): Promise<AddressDto[]> {
    const address =
      await this._addressService.getAddresssByCustomerId(customerId);
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

  /**
   * Creates a new address.
   * @param dto - The data transfer object containing address details
   */
  @Post()
  async createAddress(@Body() dto: AddressDto): Promise<AddressDto> {
    const created = await this._addressService.createAddress(dto);
    if (!created) throw new ForbiddenException("Customer is not valid");
    return {
      ...created,
      customerId: created.customer.id ?? dto.customerId,
    };
  }

  /**
   * Updates an existing address.
   * @param id - The ID of the address to update
   */
  @Patch(":id")
  async patchAddress(
  @Param("id") id: string,
  @Body() dto: UpdateAddressDto,
  ): Promise<AddressDto> {
    const updated = await this._addressService.updateAddress(id, dto);
    if (!updated) throw new NotFoundException(`Address with id ${id} not found`);
    return updated;
  }

  /**
   * Deletes an address by its ID.
   * @param id - The ID of the address to delete
   */
  @Delete(":id")
  async deleteAddressById(@Param("id") id: string): Promise<void> {
    const deleted = await this._addressService.deleteAddressById(id);
    if (!deleted) throw new NotFoundException(`Address with id ${id} not found`);
  }
}
