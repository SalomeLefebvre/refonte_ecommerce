import { BadRequestException, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { Product } from "./interfaces/product.interface";

@Injectable()
export class OrderBusinessService {
  /**
   *
   */
  constructor(private readonly _httpService: HttpService) {}

  /**
   *
   */
  async validateItemAvailability(productId: string, quantity: number): Promise<void> {
    const url = `http://localhost:3000/product/${productId}`;

    const response = await firstValueFrom(this._httpService.get<Product>(url));
    const product = response.data;

    if (product.stock < quantity)
      throw new BadRequestException("Produit indisponible en quantité suffisante");
  }

  /**
   *
   */
  calculateItemPrice(unitaryPrice: number, quantity: number): number {
    return unitaryPrice * quantity;
  }
}
