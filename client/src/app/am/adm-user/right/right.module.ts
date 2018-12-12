import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { RightListComponent } from './right-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from "angular2-datatable";
import { ResponseMessageModule } from '../../../common/util/response-message/response-message.module';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { createTranslateLoader, CustomHandler } from '../../../i18n-setting';
import { HttpClient } from '@angular/common/http';
import { RightDetailComponent } from './right-detail/right-detail.component';
import { AuthGuardSubmenu } from '../../../authentication/guard/auth.guard-submenu';
import { RightBusinessComponent } from './right-business/right-business.component';

const routes: Routes = [

  { path: '', component: RightListComponent, pathMatch: 'full' },
  { path: 'detail/:id', component: RightDetailComponent, pathMatch: 'full' },
  { path: ':business/:id', canActivate: [AuthGuardSubmenu], component: RightBusinessComponent, pathMatch: 'full' },
  { path: ':business', canActivate: [AuthGuardSubmenu], component: RightBusinessComponent, pathMatch: 'full' },
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
    RightListComponent,
    RightBusinessComponent,
    RightDetailComponent,
  ],
  exports: [RouterModule],
  providers: [AuthGuardSubmenu]
})
export class RightModule { }
