import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { TranslateService } from '@ngx-translate/core';
import { browser } from 'protractor';
import { ProductService } from '../product.service';
import { ProductForm } from '../product-form.component';
import { Constants } from '../../../../common/util/constants';

@Component({
  selector: 'app-product-business',
  templateUrl: './product-business.component.html',
  providers: [ProductService]
})

/**
 * @description: Component quản lý việc chỉnh sửa.
 */
export class ProductBusinessComponent implements OnInit {
  private sub: any;
  id: number;
  business: string;
  productForm: FormGroup;
  product: any;

  isUpdate: boolean = true;

  listStatus = Constants.STATUS_LIST;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private productService: ProductService,
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
      this.productForm = ProductForm.productForm(this.fb, this.business);
      if (this.business == 'create') {
        this.isUpdate = false;
      }
      if (this.business == 'update') {
        this.isUpdate = true;
        this.bindingData(this.productForm, this.id);
      }
    });
  }
  
  bindingData(productForm, id) {
    this.productService.findOne(id)
      .then(response => {
        this.product = response.data;
        ProductForm.bindingData(productForm, this.product);
      })
      .catch(error => console.log("errors: " + error));
  }

  /**
   * @description : Hàm gọi Update
   * @param product : truyền object cần chỉnh sửa.
   */
  submit(product) {
    if (this.isUpdate) {
      this.updateProduct(product);
    } else {
      this.createProduct(product);
    }
  }

  createProduct(product) {
    this.productService.create(product)
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

  updateProduct(product) {
    this.productService.update(product)
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
    if (this.productForm.get('code').invalid) {
      if (this.productForm.get('code').errors.required) {
        return false;
      }
      if (this.productForm.get('code').errors.pattern != null) {
        return false;
      }
      if (this.productForm.get('code').errors.maxlength != null) {
        return false;
      }
    }
    // check product name is valid
    if (this.productForm.get('name').invalid) {
      if (this.productForm.get('name').errors.required) {
        return false;
      }
      if (this.productForm.get('name').errors.pattern != null) {
        return false;
      }
      if (this.productForm.get('name').errors.maxlength != null) {
        return false;
      }
    }
    
    
    return true;
  }

  goBack() {
    this.location.back();
  }
}
