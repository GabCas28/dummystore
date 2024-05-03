import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { StoreModule } from '@ngrx/store';
import { productsReducer } from '../../store/product/product.reducer';
import { userReducer } from '../../store/user/user.reducer';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { routes } from '../../app.routes';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        LoginComponent,
        HttpClientTestingModule,
        RouterModule.forRoot(routes),
        StoreModule.forRoot({
          productStore: productsReducer,
          userStore: userReducer,
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display the user input', () => {
    const userInput: HTMLElement = fixture.nativeElement.querySelector('#user');
    expect(userInput).toBeTruthy();
    expect(userInput.classList.toString()).toEqual(
      'ng-untouched ng-pristine ng-invalid'
    );
  });

  it('user input should be valid with random text', () => {
    const userInput: HTMLInputElement =
      fixture.nativeElement.querySelector('#user');
    userInput.value = 'asdfasdfasdf';
    userInput.dispatchEvent(new Event('input'));
    userInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(userInput.classList.toString()).toEqual(
      'ng-touched ng-dirty ng-valid'
    );
  });

  it('user input should be valid with an email as input', () => {
    const userInput: HTMLInputElement =
      fixture.nativeElement.querySelector('#user');
    userInput.value = 'test@gmail.com';
    userInput.dispatchEvent(new Event('input'));
    userInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(userInput.classList.toString()).toEqual(
      'ng-touched ng-dirty ng-valid'
    );

    expect(
      fixture.nativeElement.querySelector('.form-feedback').textContent
    ).toEqual('');
  });

  it('should display the password input', () => {
    const passwordInput: HTMLElement =
      fixture.nativeElement.querySelector('#password');

    expect(passwordInput).toBeTruthy();
    expect(passwordInput.classList.toString()).toEqual(
      'ng-untouched ng-pristine ng-invalid'
    );
  });

  it('password input should be invalid with less than 8 letters', () => {
    const passwordInput: HTMLInputElement =
      fixture.nativeElement.querySelector('#password');
    passwordInput.value = 'asd';
    passwordInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(passwordInput.classList.toString()).toEqual(
      'ng-invalid ng-touched ng-dirty'
    );

    expect(
      fixture.nativeElement.querySelector('.form-feedback').textContent
    ).toEqual(' Password must be at least 8 characters long. ');
  });

  it('password input should be invalid with more than 32 letters', () => {
    const passwordInput: HTMLInputElement =
      fixture.nativeElement.querySelector('#password');
    passwordInput.value = 'asasdfasdfsadfasdfsadfsdfsadfsadfd';
    passwordInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(passwordInput.classList.toString()).toEqual(
      'ng-invalid ng-touched ng-dirty'
    );

    expect(
      fixture.nativeElement.querySelector('.form-feedback').textContent
    ).toEqual(' Password must be at most 32 characters long. ');
  });

  it('user input should be valid a string between 8 and 32 characters', () => {
    const passwordInput: HTMLInputElement =
      fixture.nativeElement.querySelector('#password');
    passwordInput.value = 'fasdfsdfsfd';
    passwordInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(passwordInput.classList.toString()).toEqual(
      'ng-touched ng-dirty ng-valid'
    );
  });

  it('should display the login button', () => {
    expect(fixture.nativeElement.querySelector('#login')).toBeTruthy();
  });

  it('should not display other input', () => {
    expect(
      fixture.nativeElement.querySelector('input:not(#password,#user,#login)')
    ).toBeFalsy();
  });
});
