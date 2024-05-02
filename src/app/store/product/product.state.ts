import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Product } from '../../interfaces/product.interface';

export const productAdapter: EntityAdapter<Product> =
  createEntityAdapter<Product>();

export interface ProductState extends EntityState<Product> {}
