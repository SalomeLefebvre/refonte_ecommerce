import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product/product.service';
import { IProduct } from '../../services/product/product.interface';
import { Tag } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [DataViewModule, Tag, ButtonModule, CommonModule, SelectButtonModule, FormsModule],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.scss'
})
export class CatalogueComponent implements OnInit {

  products: IProduct[] = [];

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        console.log(this.products)
      },
      error: (err) => {
        console.error('Erreur lors du chargement des produits :', err);
      }
    });
  }

  getSeverity(product: IProduct): string {
    switch (product.stock) {
      case 0:
        return 'danger';
      case 1:
        return 'warning';
      default:
        return 'success';
    }
  }
}
