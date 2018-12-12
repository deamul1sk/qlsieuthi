import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { TranslateService } from '@ngx-translate/core';
import { browser } from 'protractor';
import { CustomerService } from '../customer.service';
import { CustomerForm } from '../customer-form.component';
import { Constants } from '../../../../common/util/constants';

@Component({
  selector: 'app-customer-business',
  templateUrl: './customer-business.component.html',
  providers: [CustomerService]
})

/**
 * @description: Component quản lý việc chỉnh sửa.
 */
export class CustomerBusinessComponent implements OnInit {
  private sub: any;
  id: number;
  business: string;
  customerForm: FormGroup;
  customer: any;

  isUpdate: boolean = true;

  listStatus = Constants.STATUS_LIST;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private customerService: CustomerService,
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
      this.customerForm = CustomerForm.customerForm(this.fb, this.business);
      if (this.business == 'create') {
        this.isUpdate = false;
      }
      if (this.business == 'update') {
        this.isUpdate = true;
        this.bindingData(this.customerForm, this.id);
      }
    });
  }
  
  bindingData(customerForm, id) {
    this.customerService.findOne(id)
      .then(response => {
        this.customer = response.data;
        CustomerForm.bindingData(customerForm, this.customer);
      })
      .catch(error => console.log("errors: " + error));
  }

  /**
   * @description : Hàm gọi Update
   * @param customer : truyền object cần chỉnh sửa.
   */
  submit(customer) {
    if (this.isUpdate) {
      this.updateCustomer(customer);
    } else {
      this.createCustomer(customer);
    }
  }

  createCustomer(customer) {
    this.customerService.create(customer)
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

  updateCustomer(customer) {
    this.customerService.update(customer)
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
    if (this.customerForm.get('code').invalid) {
      if (this.customerForm.get('code').errors.required) {
        return false;
      }
      if (this.customerForm.get('code').errors.pattern != null) {
        return false;
      }
      if (this.customerForm.get('code').errors.maxlength != null) {
        return false;
      }
    }
    // check customer name is valid
    if (this.customerForm.get('name').invalid) {
      if (this.customerForm.get('name').errors.required) {
        return false;
      }
      if (this.customerForm.get('name').errors.pattern != null) {
        return false;
      }
      if (this.customerForm.get('name').errors.maxlength != null) {
        return false;
      }
    }
    
    
    return true;
  }

  goBack() {
    this.location.back();
  }
}
