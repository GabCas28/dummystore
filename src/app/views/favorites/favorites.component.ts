import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './favorites.template.html',
  styleUrl: './favorites.styles.css',
})
export class FavoritesComponent {}
