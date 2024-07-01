import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAddeditComponent } from './product-addedit/product-addedit.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = 
[

  {path:'', component:ProductComponent},
  {path:'add', component:ProductAddeditComponent},
  {path:'edit/:id', component:ProductAddeditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
