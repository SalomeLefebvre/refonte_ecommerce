import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, CatalogueComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Refonte e-commerce';
}
