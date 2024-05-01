import { createReducer, on } from '@ngrx/store';
import { loadProductList } from './product.actions';
import { ProductState } from './product.state';

export const initialState: ProductState = {
  products: [],
};

export const productsReducer = createReducer(
  initialState,
  on(loadProductList, (state, { products }) => ({ products: products }))
);
