import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, ForbiddenException } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CustomerDto } from "./dtos/customer.dto";
import { UpdateCustomerDto } from "./dtos/update-customer.dto";
import { CustomerEntity } from "./entities/customer.entity";

@Controller("customers")
export class CustomerController {
  /**
   *
   */
  constructor(private readonly _customerService: CustomerService) {}

  /**
   * Retrieves all customers.
   */
  @Get()
  async getAllCustomers(): Promise<CustomerDto[]> {
    return this._customerService.getAllCustomers();
  }

  /**
   * Retrieves a customer by its ID.
   * @param id - The ID of the customer to retrieve
   */
  @Get(":id")
  async getCustomerById(@Param("id") id: string): Promise<CustomerDto> {
    const customer = await this._customerService.getCustomerById(id);
    if (!customer)
      throw new NotFoundException(`Customer with ID ${id} not found`);

    return customer;
  }

  /**
   * Creates a new customer.
   * @param dto - The CustomerDto containing customer details
   */
  @Post()
  async createCustomer(@Body() dto: CustomerDto): Promise<CustomerEntity> {
    const customer = await this._customerService.createCustomer(dto);
    if (!customer)
      throw new ForbiddenException("Invalid addresses provided for the customer");
    return customer;
  }

  /**
   * Updates an existing customer.
   * @param id - The ID of the customer to update
   * @param updates - Fields to update
   */
  @Put(":id")
  async updateCustomer(
    @Param("id") id: string,
    @Body() updates: UpdateCustomerDto,
  ): Promise<CustomerDto> {
    const updated = await this._customerService.updateCustomer(id, updates);
    if (!updated)
      throw new NotFoundException(`Customer with ID ${id} not found or address not valid`);

    return updated;
  }

  /**
   * Deletes a customer by its ID.
   * @param id - The ID of the customer to delete
   */
  @Delete(":id")
  async deleteCustomer(@Param("id") id: string): Promise<{ deleted: boolean }> {
    const result = await this._customerService.deleteCustomerById(id);
    if (!result)
      throw new NotFoundException(`Customer with ID ${id} not found`);

    return { deleted: true };
  }
}