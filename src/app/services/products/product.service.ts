import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductsActions } from '../../store/product/product.actions';
import { Product } from '../../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private store = inject(Store);
  constructor(public httpClient: HttpClient) {}

  /**
   * Request product catalog and load it in app store
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

  /**
   * Add product to catalog, returns the created product
   */
  public addProduct(product: Product): void {
    this.httpClient
      .post('https://dummyjson.com/products/add', product)
      .subscribe((data: any) => {
        console.log(`Product was successfully created with id ${data.id}.`);
      });
  }
  /**
   * Update product in catalog, returns the modified product
   */
  public updateProduct(productId: number, product: Product): void {
    this.httpClient
      .put(`https://dummyjson.com/products/${productId}`, product)
      .subscribe((data: any) => {
        console.log(`Product with id ${data.id} was successfully edited.`);
      });
  }

  /**
   * Remove product from catalog, returns the deleted product with isDeleted/deletedOn keys
   */
  public removeProduct(productId: number): void {
    this.httpClient
      .delete(`https://dummyjson.com/products/${productId}`)
      .subscribe((product: any) => {
        console.log(`Product with id ${product.id}, was successfully deleted.`);
      });
  }
}
