import { AppState } from '../app.state';
import { createSelector } from '@ngrx/store';
import { UserState } from './user.state';

export const selectUserStore: (state: AppState) => UserState = (state) => {
  return state?.userStore;
};

export const selectUser = createSelector(
  selectUserStore,
  (state: UserState) => state?.user
);
