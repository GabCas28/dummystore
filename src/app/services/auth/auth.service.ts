import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, Subscription, catchError, map, pipe, take, throwError } from 'rxjs';
import { UserActions } from '../../store/user/user.actions';
import { Router } from '@angular/router';
import { ProductService } from '../products/product.service';
import { selectUser } from '../../store/user/user.selectors';
import { ProductsActions } from '../../store/product/product.actions';

@Injectable()
class UserToken {}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private store = inject(Store);
  private productService = inject(ProductService);
  private httpClient = inject(HttpClient);

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      alert(`An error occurred: ${JSON.stringify(error.error)}`);
      this.router.navigate(['login']);
    } else {
      alert(
        `Backend returned code ${error.status}, message was:  ${JSON.stringify(
          error.error
        )}`
      );
      this.router.navigate(['login']);
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
  /**
   * Send username and password to log in and receive authentication token.
   */
  public logIn(username: string, password: string): Subscription {
    return this.httpClient
      .post('https://dummyjson.com/auth/login', {
        username,
        password,
      })
      .pipe(catchError(this.handleError))
      .subscribe((user: any) => {
        this.store.dispatch(UserActions.setUser({ user: user }));
        sessionStorage.setItem('bearer', user.token);
        this.productService.getProducts();
        this.router.navigate(['home']);
      });
  }
  public logOut(): void {
    this.store.dispatch(UserActions.setUser({ user: {} }));
    this.store.dispatch(ProductsActions.loadProducts({ products: [] }));
    sessionStorage.setItem('bearer', 'undefined');
    this.router.navigate(['login']);
  }

  public isLoggedIn(): Observable<Boolean> {
    return this.store.select(selectUser).pipe(
      take(1),
      map((user) => {
        return !!user && !!user.token && user.token != 'undefined';
      })
    );
  }
}
