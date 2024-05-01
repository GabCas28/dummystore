import { Injectable, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable()
class UserToken {}

export const isLoggedInGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  // const isLoggedIN = inject(AuthService).canActivate(inject(UserToken), route.params['id'])
  const isLoggedIN = true;
  console.log({ isLoggedIN });
  return isLoggedIN;
};
