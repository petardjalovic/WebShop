import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasketRoutingModule } from './basket-routing.module';
import { BasketComponent } from './basket.component';
import { BasketService } from './basket.service';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BasketComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BasketRoutingModule,
    SharedModule
  ]
})
export class BasketModule { }
