import { createSelector } from '@ngrx/store';
import { Product } from '../../interfaces/product.interface';
import { AppState } from '../app.state';
import { ProductState } from './product.state';

export const selectProductStore: (state: AppState) => ProductState = (
  appState: AppState
) => appState?.productStore;

export const selectAllProducts: (state: AppState) => Product[] = createSelector(
  selectProductStore,
  (state: ProductState) => {
    return state?.ids?.length > 0
      ? state.ids.map((id) => state?.entities[id] ?? { id: 0 })
      : [];
  }
);
export const selectAllFavorites = createSelector(
  selectAllProducts,
  (products) => products.filter((prod) => prod?.isFavorite)
);
