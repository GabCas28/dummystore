import { ProductState } from './product.state';

export const selectAllProducts = (state: ProductState) => state.products;
