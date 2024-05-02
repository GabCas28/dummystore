import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/user/user.selectors';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.template.html',
  styleUrl: './header.styles.scss',
  providers: [AuthService],
})
export class HeaderComponent {
  public authService = inject(AuthService);
  public store = inject(Store);
  public user$ = this.store.select(selectUser);
  public isLoggedIn$ = this.authService.isLoggedIn();

  public logOut() {
    this.authService.logOut();
  }
}
