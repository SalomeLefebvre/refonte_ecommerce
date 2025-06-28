import { IsUUID, IsString, IsNumber } from "class-validator";

export class OrderItemDto {
  @IsUUID()
    id: string;

  @IsUUID()
    productId: string;

  @IsUUID()
    carrierId: string;

  @IsNumber()
    quantity: number;

  @IsString()
    unitPrice: string;

  @IsString()
    totalPrice: string;

  @IsUUID()
    orderId: string;
}