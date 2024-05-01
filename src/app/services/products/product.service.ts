import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadProductList } from '../../store/product/product.actions';
import { selectAllProducts } from '../../store/product/product.selectors';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private store = inject(Store);
  constructor(public httpClient: HttpClient) {}

  /**
   * Request product catalog
   */
  public getProducts(): void {
    this.store.dispatch(loadProductList({ products: [] }));

    this.httpClient
      .get('https://dummyjson.com/products')
      .subscribe((data: any) => {
        console.log({ data });
        this.store.dispatch(loadProductList({ products: data.products }));
      });

    this.store
      .select(selectAllProducts)
      .subscribe((allProducts) => console.log(allProducts));
  }
}
