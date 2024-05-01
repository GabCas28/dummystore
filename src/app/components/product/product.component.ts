import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.template.html',
  styleUrl: './product.styles.scss',
})
export class ProductComponent {
  @Input() public product: Product = {};
  @Input() public isFavorite: boolean = false;
}
