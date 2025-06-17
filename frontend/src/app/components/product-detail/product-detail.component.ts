import { Component, Input } from '@angular/core';
import { IProduct } from '../../services/product/product.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  @Input() product!: IProduct;

  addToCart() {
    }
} 