import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTotalComponent } from './order-total/order-total.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {MatStepperModule} from '@angular/material/stepper';


@NgModule({
  declarations: [
    OrderTotalComponent
  ],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    NgbCarouselModule,
    ReactiveFormsModule,
    MatStepperModule,
  ],
  exports :[
    OrderTotalComponent,
    NgbCarouselModule,
    ReactiveFormsModule,
    BsDropdownModule 
  ]
})
export class SharedModule { }
