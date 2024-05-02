import { AppState } from '../app.state';
import { User } from '../../interfaces/user.interface';

export const selectUser: (state: AppState) => User = (state) => {
  return state?.userStore?.user;
};
