import { createActionGroup, props } from '@ngrx/store';
import { User } from '../../interfaces/user.interface';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Set User': props<{ user: User }>(),
    'Log Out': props<{ user: User }>(),
  },
});
