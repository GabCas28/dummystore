import { createAction, createActionGroup, props } from '@ngrx/store';
import { Product } from '../../interfaces/product.interface';

export const ProductsActions = createActionGroup({
  source: 'Products',
  events: {
    'Load Products': props<{ products: Array<Product> }>(),
    'Edit Product': props<{ product: Product }>(),
  },
});
