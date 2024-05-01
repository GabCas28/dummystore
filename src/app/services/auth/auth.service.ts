import { HttpClient } from '@angular/common/http';
import { Injectable  } from '@angular/core';

import { Observable, map } from 'rxjs';

@Injectable()
class UserToken {}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public httpClient: HttpClient) {}

  canActivate(currentUser: UserToken, userId: string): boolean {
    return true;
  }
  canMatch(currentUser: UserToken): boolean {
    return true;
  }

  /**
   * Send username and password to log in and receive authentication token.
   */
  public logIn(): Observable<any[]> {
    return this.httpClient
      .post(
        'https://dummyjson.com/auth/login',
        JSON.stringify({
          username: 'kminchelle',
          password: '0lelplR',
        })
      )
      .pipe(map((data: any) => data.json()));
  }

  /**
   * Send token to refresh its duration before it expires.
   */
  public refreshToken(): Observable<any[]> {
    return this.httpClient
      .get(
        'https://services.odata.org/TripPinRESTierService/%28S%28j1rncy232ruwwt3enbdp2ajy%29%29/People'
      )
      .pipe(map((data: any) => data.value));
  }
}
