import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [DrawerModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
@Input() visible: boolean = false;
@Output() visibleChange = new EventEmitter<boolean>();
}
