import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { TranslateService } from '@ngx-translate/core';
import { browser } from 'protractor';
import { RightService } from '../right.service';
import { RightForm } from '../right-form.component';
import { Constants } from '../../../../common/util/constants';

@Component({
  selector: 'app-right-business',
  templateUrl: './right-business.component.html',
  providers: [RightService]
})

/**
 * @description: Component quản lý việc chỉnh sửa.
 */
export class RightBusinessComponent implements OnInit {
  private sub: any;
  id: number;
  business: string;
  rightForm: FormGroup;
  right: any;

  isUpdate: boolean = true;

  listStatus = Constants.STATUS_LIST;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private rightService: RightService,
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
      this.rightForm = RightForm.rightForm(this.fb, this.business);
      if (this.business == 'create') {
        this.isUpdate = false;
      }
      if (this.business == 'update') {
        this.isUpdate = true;
        this.bindingData(this.rightForm, this.id);
      }
    });
  }
  
  bindingData(rightForm, id) {
    this.rightService.findOne(id)
      .then(response => {
        this.right = response.data;
        RightForm.bindingData(rightForm, this.right);
      })
      .catch(error => console.log("errors: " + error));
  }

  /**
   * @description : Hàm gọi Update
   * @param right : truyền object cần chỉnh sửa.
   */
  submit(right) {
    if (this.isUpdate) {
      this.updateRight(right);
    } else {
      this.createRight(right);
    }
  }

  createRight(right) {
    this.rightService.create(right)
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

  updateRight(right) {
    this.rightService.update(right)
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
    if (this.rightForm.get('code').invalid) {
      if (this.rightForm.get('code').errors.required) {
        return false;
      }
      if (this.rightForm.get('code').errors.pattern != null) {
        return false;
      }
      if (this.rightForm.get('code').errors.maxlength != null) {
        return false;
      }
    }
    // check right name is valid
    if (this.rightForm.get('name').invalid) {
      if (this.rightForm.get('name').errors.required) {
        return false;
      }
      if (this.rightForm.get('name').errors.pattern != null) {
        return false;
      }
      if (this.rightForm.get('name').errors.maxlength != null) {
        return false;
      }
    }
    
    
    return true;
  }

  goBack() {
    this.location.back();
  }
}
