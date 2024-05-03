import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { LoginComponent } from '../../views/login/login.component';
import { StoreModule } from '@ngrx/store';
import { productsReducer } from '../../store/product/product.reducer';
import { userReducer } from '../../store/user/user.reducer';
import { ProductsActions } from '../../store/product/product.actions';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        LoginComponent,
        StoreModule.forRoot({
          productStore: productsReducer,
          userStore: userReducer,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product details', () => {
    component.product = {
      id: 3,
      title: 'Iphone',
      thumbnail: 'somepic',
      description: 'some phone',
      price: 343,
    };
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).innerText).toEqual(
      `Iphone\nsome phone\n343 €`
    );
  });

  it('should call Store to update favorite info', () => {
    component.product = {
      id: 3,
    };
    const storeSpy = spyOn(component.store, 'dispatch').and.callThrough();
    component.onFavorite();
    fixture.detectChanges();
    expect(storeSpy).toHaveBeenCalledOnceWith(
      ProductsActions.editProduct({ product: { id: 3, isFavorite: true } })
    );
    component.onFavorite();
    fixture.detectChanges();
    expect(storeSpy).toHaveBeenCalledWith(
      ProductsActions.editProduct({ product: { id: 3, isFavorite: false } })
    );
  });
});
