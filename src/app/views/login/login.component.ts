import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductService } from '../../services/products/product.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HeaderComponent],
  templateUrl: './login.template.html',
  styleUrl: './login.styles.css',
  providers: [ProductService, AuthService],
})
export class LoginComponent {
  private authService = inject(AuthService);

  // Reset Inputs to original state
  public clearForm() {
    this.loginForm.reset();
  }

  // Control and validate the 'Email' input
  public user = new FormControl('', {
    validators: [Validators.required],
  });

  // Control and validate the 'Password' input
  public password = new FormControl('', {
    validators: [
      Validators.required,
      Validators.maxLength(32),
      Validators.minLength(8),
    ],
  });

  public loginForm = new FormGroup({
    user: this.user,
    password: this.password,
  });

  public onLogIn() {
    const { user, password } = this.loginForm.value;
    if (typeof user === 'string' && typeof password === 'string') {
      this.authService.logIn(user, password).add(() => this.clearForm());
    }
  }
}
