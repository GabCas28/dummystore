import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductService } from '../../services/products/product.service';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../../components/product/product.component';
import { Product } from '../../interfaces/product.interface';
import { Store } from '@ngrx/store';
import { selectAllFavorites } from '../../store/product/product.selectors';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [HeaderComponent, CommonModule, ProductComponent],
  templateUrl: './favorites.template.html',
  styleUrl: './favorites.styles.css',
  providers: [ProductService],
})
export class FavoritesComponent {
  private store = inject(Store);

  public products$: Observable<Product[]> = this.store
    .select(selectAllFavorites)
    .pipe(take(1));
}
