import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { RoleListComponent } from './role-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from "angular2-datatable";
import { ResponseMessageModule } from '../../../common/util/response-message/response-message.module';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { createTranslateLoader, CustomHandler } from '../../../i18n-setting';
import { HttpClient } from '@angular/common/http';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { AuthGuardSubmenu } from '../../../authentication/guard/auth.guard-submenu';
import { RoleBusinessComponent } from './role-business/role-business.component';

const routes: Routes = [

  { path: '', component: RoleListComponent, pathMatch: 'full' },
  { path: 'detail/:id', component: RoleDetailComponent, pathMatch: 'full' },
  { path: ':business/:id', canActivate: [AuthGuardSubmenu], component: RoleBusinessComponent, pathMatch: 'full' },
  { path: ':business', canActivate: [AuthGuardSubmenu], component: RoleBusinessComponent, pathMatch: 'full' },
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
    RoleListComponent,
    RoleBusinessComponent,
    RoleDetailComponent,
  ],
  exports: [RouterModule],
  providers: [AuthGuardSubmenu]
})
export class RoleModule { }
