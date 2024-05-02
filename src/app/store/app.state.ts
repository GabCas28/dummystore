import { Product } from '../interfaces/product.interface';
import { ProductState } from './product/product.state';
import { UserState } from './user/user.state';

export interface AppState {
  productStore: ProductState;
  userStore: UserState;
}
