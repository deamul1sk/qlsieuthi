

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CustomerService } from '../customer.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Customer } from '../customer';


@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  providers: [CustomerService]
})

/**
 * @description: Component management show detail
 */
export class CustomerDetailComponent implements OnInit {
  private sub: any;
  id: number;
  customer: Customer;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private customerService: CustomerService,
    public vcr: ViewContainerRef
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.customerService.findOne(this.id)
      .then(response => {
        this.customer = response.data;
      })
      .catch(error =>{
        console.log("errors: " + error);
      })
    });
  }
  goBack() {
    this.location.back();
  }

}
