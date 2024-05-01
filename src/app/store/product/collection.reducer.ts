import { createReducer, on } from '@ngrx/store';

export const initialState: ReadonlyArray<string> = [];

// export const collectionReducer = createReducer(
//   initialState,
//   on(ProductsActions.removeProduct, (state, { productId }) =>
//     state.filter((id) => id !== productId)
//   ),
//   on(ProductsActions.addProduct, (state, { productId }) => {
//     if (state.indexOf(productId) > -1) return state;

//     return [...state, productId];
//   })
// );
