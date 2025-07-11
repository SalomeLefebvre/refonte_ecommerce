import { IsUUID, IsString, IsDateString, IsNumberString } from "class-validator";

export class UpdateOrderDto {
  @IsDateString()
    orderDate?: string;

  @IsString()
    status?: string;

  @IsUUID()
    carrierId?: string;

  @IsUUID()
    paymentId?: string;

  @IsNumberString()
    orderTotal?: string;

  @IsUUID()
    shippingAddressId?: string;

  @IsUUID()
    billingAddressId?: string;

  @IsUUID()
    customerId?: string;
}
