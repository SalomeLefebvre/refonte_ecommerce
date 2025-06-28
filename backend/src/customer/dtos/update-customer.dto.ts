import { IsOptional, IsString } from "class-validator";

export class UpdateCustomerDto {
  @IsOptional()
  @IsString()
    name?: string;

  @IsOptional()
  @IsString()
    email?: string;

  @IsOptional()
  @IsString()
    defaultShippingAddressId?: string;

  @IsOptional()
  @IsString()
    defaultBillingAddressId?: string;
}