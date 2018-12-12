

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RoleService } from '../role.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Role } from '../role';


@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  providers: [RoleService]
})

/**
 * @description: Component management show detail
 */
export class RoleDetailComponent implements OnInit {
  private sub: any;
  id: number;
  role: Role;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private roleService: RoleService,
    public vcr: ViewContainerRef
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.roleService.findOne(this.id)
      .then(response => {
        this.role = response.data;
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
