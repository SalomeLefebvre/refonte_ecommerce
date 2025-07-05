import { IsOptional, IsUUID, IsString, IsNumber } from "class-validator";

export class UpdateOrderItemDto {
  @IsOptional()
  @IsUUID()
    id?: string;

  @IsOptional()
  @IsUUID()
    productId?: string;

  @IsOptional()
  @IsUUID()
    carrierId?: string;

  @IsOptional()
  @IsNumber()
    quantity?: number;

  @IsOptional()
  @IsString()
    unitPrice?: string;

  @IsOptional()
  @IsString()
    totalPrice?: string;

  @IsOptional()
  @IsUUID()
    orderId?: string;
}
