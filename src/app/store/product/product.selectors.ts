import { createSelector } from '@ngrx/store';
import { Product } from '../../interfaces/product.interface';
import { AppState } from '../app.state';

export const selectAllProducts: (state: AppState) => Product[] = (
  state: AppState
) => {
  return state?.productStore?.ids?.length > 0
    ? state.productStore.ids.map(
        (id) => state?.productStore?.entities[id] ?? { id: 0 }
      )
    : [];
};
export const selectAllFavorites = createSelector(
  selectAllProducts,
  (products) => products.filter((prod) => prod?.isFavorite)
);
