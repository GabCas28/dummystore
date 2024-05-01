import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductService } from '../../services/products/product.service';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../../components/product/product.component';
import { Product } from '../../interfaces/product.interface';
import { Store, StoreModule } from '@ngrx/store';
import { selectAllProducts } from '../../store/product/product.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [HeaderComponent, ProductComponent, CommonModule],
  templateUrl: './home.template.html',
  styleUrl: './home.styles.css',
  providers: [ProductService],
})
export class HomeComponent implements OnInit {
  private ProductService = inject(ProductService);
  private store = inject(Store);
  public products: Observable<Product[]> = this.store.select(selectAllProducts);

  constructor() {}

  ngOnInit() {
    this.ProductService.getProducts();
  }
  public onClick() {
    this.ProductService.getProducts();
  }
}
