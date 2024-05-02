import { createReducer, on } from '@ngrx/store';
import { ProductsActions } from './product.actions';
import { ProductState, productAdapter } from './product.state';

export const initialState: ProductState = productAdapter.getInitialState();

export const productsReducer = createReducer(
  initialState,
  on(ProductsActions.loadProducts, (state, { products }) => {
    return productAdapter.setAll(products, state);
  }),
  on(ProductsActions.editProduct, (state, { product }) => {
    return productAdapter.upsertOne(product, state);
  })
);
