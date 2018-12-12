

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../user';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  providers: [UserService]
})

/**
 * @description: Component management show detail
 */
export class UserDetailComponent implements OnInit {
  private sub: any;
  id: number;
  user: User;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    public vcr: ViewContainerRef
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.userService.findOne(this.id)
      .then(response => {
        this.user = response.data;
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
