import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { productsReducer } from '../../store/product/product.reducer';
import { userReducer } from '../../store/user/user.reducer';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ProductsActions } from '../../store/product/product.actions';
import { timeout } from 'rxjs';

describe('ProductService', () => {
  let service: ProductService;
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
    service = TestBed.inject(ProductService);
    store = TestBed.inject(MockStore);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    store?.resetSelectors();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call to retrieve all products from API and store them', async () => {
    service.getProducts();
    const req = httpTestingController.expectOne(
      'https://dummyjson.com/products'
    );
    expect(req.request.method).toEqual('GET');
  });

  it('should send a product to API', () => {
    service.addProduct({ id: 1 });
    const req = httpTestingController.expectOne(
      'https://dummyjson.com/products/add'
    );
    expect(req.request.method).toEqual('POST');
  });

  it('should request an update of a product to API', () => {
    service.updateProduct(1, { id: 1 });
    const req = httpTestingController.expectOne(
      'https://dummyjson.com/products/1'
    );
    expect(req.request.method).toEqual('PUT');
  });

  it('should request an deletion of a product to API', () => {
    service.removeProduct(1);
    const req = httpTestingController.expectOne(
      'https://dummyjson.com/products/1'
    );
    expect(req.request.method).toEqual('DELETE');
  });
});
