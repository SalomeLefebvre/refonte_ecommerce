import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IProduct } from './product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly url = `${environment.apiUrl.backendUrl}/products`;

  constructor(private readonly _httpClient: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this._httpClient.get<IProduct[]>(this.url);
  }

  getProductById(idProduct: string): Observable<IProduct> {
    return this._httpClient.get<IProduct>(`${this.url}/${idProduct}`);
  }

  updateProduct(idProduct: string, dto: Partial<IProduct>): Observable<IProduct> {
    return this._httpClient.patch<IProduct>(`${this.url}/${idProduct}`, dto);
  }
}