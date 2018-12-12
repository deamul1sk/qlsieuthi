import { AppComponent } from '../app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AmComponent } from './am.component';
import { AuthGuard } from '../authentication/guard/auth.guard';

const routes: Routes = [
  {
    path: '',component :AmComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: '../common/shared/home/home.module#HomeModule'  },
      //categories
      
      { path: 'tthc', loadChildren: './categories/tthc/tthc.module#TTHCModule' },
      { path: 'customer', loadChildren: './categories/customer/customer.module#CustomerModule' },
      { path: 'product', loadChildren: './categories/product/product.module#ProductModule' },
      { path: 'role', loadChildren: './adm-user/role/role.module#RoleModule' },
      { path: 'right', loadChildren: './adm-user/right/right.module#RightModule' },
      { path: 'user', loadChildren: './adm-user/user/user.module#UserModule' },
      { path: 'employee', loadChildren: './categories/employee/employee.module#EmployeeModule' }
    ]
  }

]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmRoutingModule { }
