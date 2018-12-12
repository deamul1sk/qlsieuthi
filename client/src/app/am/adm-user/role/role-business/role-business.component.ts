import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { TranslateService } from '@ngx-translate/core';
import { browser } from 'protractor';
import { RoleService } from '../role.service';
import { RoleForm } from '../role-form.component';
import { Constants } from '../../../../common/util/constants';

@Component({
  selector: 'app-role-business',
  templateUrl: './role-business.component.html',
  providers: [RoleService]
})

/**
 * @description: Component quản lý việc chỉnh sửa.
 */
export class RoleBusinessComponent implements OnInit {
  private sub: any;
  id: number;
  business: string;
  roleForm: FormGroup;
  role: any;

  isUpdate: boolean = true;

  listStatus = Constants.STATUS_LIST;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private roleService: RoleService,
    private fb: FormBuilder,
    private translate: TranslateService,
    public toastr: ToastsManager, vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    // Lấy bản ghi theo 'id' từ @PathParam
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.business = params['business'];
      this.roleForm = RoleForm.roleForm(this.fb, this.business);
      if (this.business == 'create') {
        this.isUpdate = false;
      }
      if (this.business == 'update') {
        this.isUpdate = true;
        this.bindingData(this.roleForm, this.id);
      }
    });
  }
  
  bindingData(roleForm, id) {
    this.roleService.findOne(id)
      .then(response => {
        this.role = response.data;
        RoleForm.bindingData(roleForm, this.role);
      })
      .catch(error => console.log("errors: " + error));
  }

  /**
   * @description : Hàm gọi Update
   * @param role : truyền object cần chỉnh sửa.
   */
  submit(role) {
    if (this.isUpdate) {
      this.updateRole(role);
    } else {
      this.createRole(role);
    }
  }

  createRole(role) {
    this.roleService.create(role)
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

  updateRole(role) {
    this.roleService.update(role)
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

  isValidForm() {
    // check countyr code is valid
    if (this.roleForm.get('code').invalid) {
      if (this.roleForm.get('code').errors.required) {
        return false;
      }
      if (this.roleForm.get('code').errors.pattern != null) {
        return false;
      }
      if (this.roleForm.get('code').errors.maxlength != null) {
        return false;
      }
    }
    // check role name is valid
    if (this.roleForm.get('name').invalid) {
      if (this.roleForm.get('name').errors.required) {
        return false;
      }
      if (this.roleForm.get('name').errors.pattern != null) {
        return false;
      }
      if (this.roleForm.get('name').errors.maxlength != null) {
        return false;
      }
    }
    
    
    return true;
  }

  goBack() {
    this.location.back();
  }
}
