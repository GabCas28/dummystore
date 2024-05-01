import { createAction, createActionGroup, props } from '@ngrx/store';
import { Product } from '../../interfaces/product.interface';

// export const ProductsActions = createActionGroup({
//   source: 'Products',
//   events: {
//     'Add Product': props<{ productId: string }>(),
//     'Remove Product': props<{ productId: string }>(),
//   },
// });

export const loadProductList = createAction(
  'Set Product List',
  props<{ products: Array<Product> }>()
);
