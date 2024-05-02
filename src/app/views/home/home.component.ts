import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../../components/product/product.component';
import { Product } from '../../interfaces/product.interface';
import { Store } from '@ngrx/store';
import { selectAllProducts } from '../../store/product/product.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, ProductComponent, CommonModule],
  templateUrl: './home.template.html',
  styleUrl: './home.styles.css',
})
export class HomeComponent {
  private store = inject(Store);

  public products$: Observable<Product[]> =
    this.store.select(selectAllProducts);
}
