import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { TestErrorComponent } from './test-error/test-error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ToastrModule } from 'ngx-toastr';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    HeaderComponent,
    NotFoundComponent,
    SectionHeaderComponent,
    ServerErrorComponent,
    TestErrorComponent
  ],
  imports: [
    FontAwesomeModule,
    CommonModule,
    BreadcrumbModule,
    RouterModule,
    SharedModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-botom-right',
      preventDuplicates: true
    }),

  ],

  exports: [HeaderComponent, SectionHeaderComponent]
})
export class CoreModule { }
