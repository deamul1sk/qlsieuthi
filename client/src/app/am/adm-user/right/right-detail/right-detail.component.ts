

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RightService } from '../right.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Right } from '../right';


@Component({
  selector: 'app-right-detail',
  templateUrl: './right-detail.component.html',
  providers: [RightService]
})

/**
 * @description: Component management show detail
 */
export class RightDetailComponent implements OnInit {
  private sub: any;
  id: number;
  right: Right;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private rightService: RightService,
    public vcr: ViewContainerRef
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.rightService.findOne(this.id)
      .then(response => {
        this.right = response.data;
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
