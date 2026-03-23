import { Routes } from '@angular/router';
import { Logincomponent } from './user/login/login';
import { Profilecomponent } from './user/profile/profile';
import { Registercomponent } from './user/register/register';
import { ProductCatalogComponent } from './user/product-catalog/product-catalog';
import { EditProductComponent } from './admin/edit-product/edit-product';
import { AddProductComponent } from './admin/add-product/add-product';
import { ProductListComponent } from './admin/product-list/product-list';
import { CartComponent } from './user/cart/cart';
import { OrderHistoryComponent } from './user/orderhistory/orderhistory';
import { ProductDetailComponent } from './user/product-details/product-details';
import { PaymentCheckoutComponent } from './user/payment-checkout/payment-checkout';

export const routes: Routes = [
  { path: '', component: Logincomponent },
  { path: 'login', component: Logincomponent },
  { path: 'register', component: Registercomponent },
  { path: 'profile', component: Profilecomponent },

  { path: 'admin/products', component: ProductListComponent },
  { path: 'admin/add-product', component: AddProductComponent },
  { path: 'admin/edit-product/:id', component: EditProductComponent },
  { path: 'cart', component: CartComponent },
  { path: 'catalog', component: ProductCatalogComponent },
  { path: 'orders', component: OrderHistoryComponent},
  { path: 'product/:id', component: ProductDetailComponent},
  { path: 'checkout', component: PaymentCheckoutComponent }
];
