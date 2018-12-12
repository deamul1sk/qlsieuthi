import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { CustomerListComponent } from './customer-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from "angular2-datatable";
import { ResponseMessageModule } from '../../../common/util/response-message/response-message.module';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { createTranslateLoader, CustomHandler } from '../../../i18n-setting';
import { HttpClient } from '@angular/common/http';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { AuthGuardSubmenu } from '../../../authentication/guard/auth.guard-submenu';
import { CustomerBusinessComponent } from './customer-business/customer-business.component';

const routes: Routes = [

  { path: '', component: CustomerListComponent, pathMatch: 'full' },
  { path: 'detail/:id', component: CustomerDetailComponent, pathMatch: 'full' },
  { path: ':business/:id', canActivate: [AuthGuardSubmenu], component: CustomerBusinessComponent, pathMatch: 'full' },
  { path: ':business', canActivate: [AuthGuardSubmenu], component: CustomerBusinessComponent, pathMatch: 'full' },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ResponseMessageModule,
    DataTableModule,
    ToastModule.forRoot(),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: CustomHandler },
      isolate: false
    })
  ],
  declarations: [
    CustomerListComponent,
    CustomerBusinessComponent,
    CustomerDetailComponent,
  ],
  exports: [RouterModule],
  providers: [AuthGuardSubmenu]
})
export class CustomerModule { }
