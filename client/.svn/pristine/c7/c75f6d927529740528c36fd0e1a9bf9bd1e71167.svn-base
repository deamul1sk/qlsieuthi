

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { TTHCService } from '../tthc.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TTHC } from '../tthc';


@Component({
  selector: 'app-tthc-detail',
  templateUrl: './tthc-detail.component.html',
  providers: [TTHCService]
})

/**
 * @description: Component management show detail
 */
export class TTHCDetailComponent implements OnInit {
  private sub: any;
  id: number;
  tthc: TTHC;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private tthcService: TTHCService,
    public vcr: ViewContainerRef
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.tthcService.findOne(this.id)
      .then(response => {
        this.tthc = response.data;
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
