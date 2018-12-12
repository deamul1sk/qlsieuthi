import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { TranslateService } from '@ngx-translate/core';
import { browser } from 'protractor';
import { EmployeeService } from '../employee.service';
import { EmployeeForm } from '../employee-form.component';
import { Constants } from '../../../../common/util/constants';
import { UserService } from '../../../adm-user/user/user.service';
import { User } from '../../../adm-user/user/user';

@Component({
  selector: 'app-employee-business',
  templateUrl: './employee-business.component.html',
  providers: [EmployeeService, UserService]
})

/**
 * @description: Component quản lý việc chỉnh sửa.
 */
export class EmployeeBusinessComponent implements OnInit {
  private sub: any;
  id: number;
  business: string;
  employeeForm: FormGroup;
  employee: any;

  listUser: User[];
  indexUserSelection: number;
  userSelections: Array<any> = [];

  isUpdate: boolean = true;

  listStatus = Constants.STATUS_LIST;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private translate: TranslateService,
    private userService: UserService,
    public toastr: ToastsManager, vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    // Lấy bản ghi theo 'id' từ @PathParam
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.business = params['business'];
      this.employeeForm = EmployeeForm.employeeForm(this.fb, this.business);
      if (this.business == 'create') {
        this.isUpdate = false;
        this.getListRole()
      }
      if (this.business == 'update') {
        this.isUpdate = true;
        this.bindingData(this.employeeForm, this.id);
      }
    });
  }
  
  bindingData(employeeForm, id) {
    this.employeeService.findOne(id)
      .then(response => {
        this.employee = response.data;
        this.getListRole()
        EmployeeForm.bindingData(employeeForm, this.employee);
      })
      .catch(error => console.log("errors: " + error));
  }

  /**
   * @description : Hàm gọi Update
   * @param employee : truyền object cần chỉnh sửa.
   */
  submit(employee) {
    if (this.isUpdate) {
      this.updateEmployee(employee);
    } else {
      this.createEmployee(employee);
    }
  }

  createEmployee(employee) {
    this.employeeService.create(employee)
      .then(response => {
        this.goBack();
      })
      .catch(error => {
        let message;
        this.translate.get('Message.CreateFail').subscribe((res: string) => {
          message = res;
        });
        this.toastr.error('', message, { dismiss: 'controlled' })
          .then((toast: Toast) => {
            setTimeout(() => {
              this.toastr.dismissToast(toast);
            }, 3000);
          });
      });
  }

  updateEmployee(employee) {
    this.employeeService.update(employee)
      .then(response => {
        this.goBack();
      })
      .catch(error => {
        let message;
        this.translate.get('Message.UpdateFail').subscribe((res: string) => {
          message = res;
        });
        this.toastr.error('', message, { dismiss: 'controlled' })
          .then((toast: Toast) => {
            setTimeout(() => {
              this.toastr.dismissToast(toast);
            }, 3000);
          });
      });
  }

  private getListRole() {
    this.userService.getListUser()
      .then(response => {
        this.listUser = response.data;
        this.initializeUserSelection()
      }).catch(error => {
        console.log(error);
      });
  }

  private initializeUserSelection() {
    let role_datas = [];
    var countItems = 0;
    if (this.listUser != null && this.listUser != undefined) {
      this.listUser.forEach(element => {
        var item = {
          id: null, text: null
        };
        item.text = element.username;
        item.id = element.id;
        role_datas.push(item);
        if (this.employee != undefined && this.employee != null && item.id == this.employee.user.id) {
          this.indexUserSelection = countItems;
        }
        countItems += 1;
      });
    }
    this.userSelections = role_datas;
    console.log(this.userSelections);
  }

  isValidForm() {
    // check countyr code is valid
    if (this.employeeForm.get('code').invalid) {
      if (this.employeeForm.get('code').errors.required) {
        return false;
      }
      if (this.employeeForm.get('code').errors.pattern != null) {
        return false;
      }
      if (this.employeeForm.get('code').errors.maxlength != null) {
        return false;
      }
    }
    // check employee name is valid
    if (this.employeeForm.get('name').invalid) {
      if (this.employeeForm.get('name').errors.required) {
        return false;
      }
      if (this.employeeForm.get('name').errors.pattern != null) {
        return false;
      }
      if (this.employeeForm.get('name').errors.maxlength != null) {
        return false;
      }
    }
    
    if (this.employeeForm.get('user.id').invalid) {
      if (this.employeeForm.get('user.id').value === "") {
        return false;
      }
      if (this.employeeForm.get('user.id').value == 0) {
        return false;
      }
    }
    
    
    return true;
  }

  goBack() {
    this.location.back();
  }
}
