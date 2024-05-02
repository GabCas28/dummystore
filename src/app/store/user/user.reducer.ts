import { createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { UserState } from './user.state';

export const initialState = {};

export const userReducer = createReducer(
  initialState,
  on(UserActions.logOut, (state, { user }) => {
    return { ...state, user: {} };
  }),
  on(UserActions.setUser, (state, { user }) => {
    return { ...state, user: user };
  })
);
