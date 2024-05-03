import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { Store } from '@ngrx/store';
import { ProductsActions } from '../../store/product/product.actions';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.template.html',
  styleUrl: './product.styles.scss',
})
export class ProductComponent {
  @Input() public product: Product = { id: 0 };
  public store = inject(Store);

  public onFavorite() {
    this.product = { ...this.product, isFavorite: !this.product.isFavorite };
    this.store.dispatch(ProductsActions.editProduct({ product: this.product }));
  }
}
