

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Employee } from '../employee';


@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  providers: [EmployeeService]
})

/**
 * @description: Component management show detail
 */
export class EmployeeDetailComponent implements OnInit {
  private sub: any;
  id: number;
  employee: Employee;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private employeeService: EmployeeService,
    public vcr: ViewContainerRef
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.employeeService.findOne(this.id)
      .then(response => {
        this.employee = response.data;
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
