import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { isLoggedInGuard } from './guards/auth/is-logged-in.guard';
import { FavoritesComponent } from './views/favorites/favorites.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [isLoggedInGuard] },
  {
    path: 'favorites',
    component: FavoritesComponent,
    canActivate: [isLoggedInGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];
