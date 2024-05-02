import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const isLoggedInGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  authService.isLoggedIn().subscribe((isLoggedIn) => {
    if (!isLoggedIn) {
      router.navigateByUrl('/login');
      return false;
    }
    return true;
  });
};
