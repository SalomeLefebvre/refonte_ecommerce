import { IsString, IsUUID } from "class-validator";

export class AddressDto {
  @IsUUID()
  id: string;

  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsString()
  zipCode: string;

  @IsString()
  country: string;

  @IsString()
  addressType: string;

  @IsString()
  customerId: string;
}
