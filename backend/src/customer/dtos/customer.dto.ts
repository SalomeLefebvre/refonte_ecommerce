import { IsString, IsUUID } from "class-validator";

export class CustomerDto {
  @IsUUID()
    id: string;

  @IsString()
    name: string;

  @IsString()
    email: string;

  @IsString()
    defaultShippingAddressId: string;

    @IsString()
      defaultBillingAddressId: string;
}