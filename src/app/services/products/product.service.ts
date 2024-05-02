import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductsActions } from '../../store/product/product.actions';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private store = inject(Store);
  constructor(public httpClient: HttpClient) {}

  /**
   * Request product catalog ad load it in app store
   */
  public getProducts(): void {
    this.httpClient
      .get('https://dummyjson.com/products')
      .subscribe((data: any) => {
        this.store.dispatch(
          ProductsActions.loadProducts({ products: data.products })
        );
      });
  }
}
