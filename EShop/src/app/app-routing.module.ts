import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [

  { path: '', component: HomeComponent, data: { breadcrumb: { label: 'home', info: { mydata: { icon: 'home', iconType: 'material' } } } } },
  { path: 'test-error', component: TestErrorComponent, data: { breadcrumb: 'Test Erros' } },
  { path: 'server-error', component: ServerErrorComponent, data: { breadcrumb: 'Server Error' } },
  { path: 'not-found', component: NotFoundComponent, data: { breadcrumb: 'Not Found' } },
  { path: 'shop', loadChildren: () => import('./shop/shop.module').then(mod => mod.ShopModule), data: { label: 'Shop', info: { mydata: { icon: 'shop', iconType: 'material' } } } },
  { path: 'basket', loadChildren: () => import('./basket/basket.module').then(mod => mod.BasketModule), data: { label: 'Basket', info: { mydata: { icon: 'Basket', iconType: 'material' } } } },
  { path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then(mod => mod.CheckoutModule), data: { label: 'checkout', info: { mydata: { icon: 'Ceckout', iconType: 'material' } } } },
  { path: 'account', loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule), data: { breadcrumb: { skip: true } } },
  { path: 'orders', loadChildren: () => import('./orders/orders.module').then(mod => mod.OrdersModule), data: { label: 'orders', info: { mydata: { icon: 'orders', iconType: 'material' } } } },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule), data: { breadcrumb: { skip: true } } },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
