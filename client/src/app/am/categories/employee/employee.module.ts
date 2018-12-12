import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { EmployeeListComponent } from './employee-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from "angular2-datatable";
import { ResponseMessageModule } from '../../../common/util/response-message/response-message.module';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { createTranslateLoader, CustomHandler } from '../../../i18n-setting';
import { HttpClient } from '@angular/common/http';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { AuthGuardSubmenu } from '../../../authentication/guard/auth.guard-submenu';
import { EmployeeBusinessComponent } from './employee-business/employee-business.component';
import { SelectModule } from 'ng2-select';

const routes: Routes = [

  { path: '', component: EmployeeListComponent, pathMatch: 'full' },
  { path: 'detail/:id', component: EmployeeDetailComponent, pathMatch: 'full' },
  { path: ':business/:id', canActivate: [AuthGuardSubmenu], component: EmployeeBusinessComponent, pathMatch: 'full' },
  { path: ':business', canActivate: [AuthGuardSubmenu], component: EmployeeBusinessComponent, pathMatch: 'full' },
] 

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ResponseMessageModule,
    DataTableModule,
    SelectModule,
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
    EmployeeListComponent,
    EmployeeBusinessComponent,
    EmployeeDetailComponent,
  ],
  exports: [RouterModule],
  providers: [AuthGuardSubmenu]
})
export class EmployeeModule { }
