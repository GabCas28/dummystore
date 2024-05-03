import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { productsReducer } from '../../store/product/product.reducer';
import { userReducer } from '../../store/user/user.reducer';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectUser } from '../../store/user/user.selectors';

describe('AuthService', () => {
  let service: AuthService;
  let store: MockStore;
  let httpTestingController: HttpTestingController;
  const initialState = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({
          productStore: productsReducer,
          userStore: userReducer,
        }),
      ],
      providers: [provideMockStore({ initialState })],
    });
    service = TestBed.inject(AuthService);
    store = TestBed.inject(MockStore);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    store?.resetSelectors();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not be logged in initially', () => {
    service.isLoggedIn().subscribe((isLoggedIn) => {
      expect(isLoggedIn).toBeFalse();
    });
  });

  it('should be logged when a user is in the store with a token', () => {
    store.overrideSelector(selectUser, { id: 3, token: 'sometoken' });
    service.isLoggedIn().subscribe((isLoggedIn) => {
      expect(isLoggedIn).toBeTrue();
    });
  });

  it('should make a post request to authenticate', () => {
    service.logIn('dsfadf', 'sadfasdf ');
    const req = httpTestingController.expectOne(
      'https://dummyjson.com/auth/login'
    );
    expect(req.request.method).toEqual('POST');
  });
});
