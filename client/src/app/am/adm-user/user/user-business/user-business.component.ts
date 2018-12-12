import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { TranslateService } from '@ngx-translate/core';
import { browser } from 'protractor';
import { UserService } from '../user.service';
import { UserForm } from '../user-form.component';
import { Constants } from '../../../../common/util/constants';
import { Role } from '../../role/role';
import { RoleService } from '../../role/role.service';

@Component({
  selector: 'app-user-business',
  templateUrl: './user-business.component.html',
  providers: [UserService, RoleService]
})

/**
 * @description: Component quản lý việc chỉnh sửa.
 */
export class UserBusinessComponent implements OnInit {
  private sub: any;
  id: number;
  business: string;
  userForm: FormGroup;
  user: any;

  listRole: Role[];
  indexRoleSelection: number;
  roleSelections: Array<any> = [];

  isUpdate: boolean = true;

  listStatus = Constants.STATUS_LIST;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private fb: FormBuilder,
    private translate: TranslateService,
    private roleService: RoleService,
    public toastr: ToastsManager, vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    // Lấy bản ghi theo 'id' từ @PathParam
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.business = params['business'];
      this.userForm = UserForm.userForm(this.fb, this.business);
      if (this.business == 'create') {
        this.isUpdate = false;
        this.getListRole()
      }
      if (this.business == 'update') {
        this.isUpdate = true;
        this.bindingData(this.userForm, this.id);
      }
    });
  }
  
  bindingData(userForm, id) {
    this.userService.findOne(id)
      .then(response => {
        this.user = response.data;
        this.getListRole()
        UserForm.bindingData(userForm, this.user);
      })
      .catch(error => console.log("errors: " + error));
  }

  /**
   * @description : Hàm gọi Update
   * @param user : truyền object cần chỉnh sửa.
   */
  submit(user) {
    if (this.isUpdate) {
      this.updateUser(user);
    } else {
      this.createUser(user);
    }
  }

  createUser(user) {
    this.userService.create(user)
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

  updateUser(user) {
    this.userService.update(user)
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
    this.roleService.getListRole()
      .then(response => {
        this.listRole = response.data;
        this.initializeRoleSelection()
      }).catch(error => {
        console.log(error);
      });
  }

  private initializeRoleSelection() {
    let role_datas = [];
    var countItems = 0;
    if (this.listRole != null && this.listRole != undefined) {
      this.listRole.forEach(element => {
        var item = {
          id: null, text: null
        };
        item.text = element.name;
        item.id = element.id;
        role_datas.push(item);
        if (this.user != undefined && this.user != null && item.id == this.user.role.id) {
          this.indexRoleSelection = countItems;
        }
        countItems += 1;
      });
    }
    this.roleSelections = role_datas;
    console.log(this.roleSelections);
  }

  isValidForm() {
    // check countyr code is valid
    if (this.userForm.get('code').invalid) {
      if (this.userForm.get('code').errors.required) {
        return false;
      }
      if (this.userForm.get('code').errors.pattern != null) {
        return false;
      }
      if (this.userForm.get('code').errors.maxlength != null) {
        return false;
      }
    }
    // check user name is valid
    if (this.userForm.get('username').invalid) {
      if (this.userForm.get('username').errors.required) {
        return false;
      }
      if (this.userForm.get('username').errors.pattern != null) {
        return false;
      }
      if (this.userForm.get('username').errors.maxlength != null) {
        return false;
      }
    }
    if (this.userForm.get('password').invalid) {
      if (this.userForm.get('password').errors.required) {
        return false;
      }
      if (this.userForm.get('password').errors.pattern != null) {
        return false;
      }
      if (this.userForm.get('password').errors.maxlength != null) {
        return false;
      }
    }
    
    if (this.userForm.get('role.id').invalid) {
      if (this.userForm.get('role.id').value === "") {
        return false;
      }
      if (this.userForm.get('role.id').value == 0) {
        return false;
      }
    }
    
    
    return true;
  }

  goBack() {
    this.location.back();
  }
}
