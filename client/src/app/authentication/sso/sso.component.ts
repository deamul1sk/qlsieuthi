import { Constants } from './../../common/util/constants';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sso',
  templateUrl: './sso.component.html',
  styleUrls: ['./sso.component.css']
})
export class SsoComponent implements OnInit {

  private returnUrl: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    localStorage.setItem(Constants.RETURN_URL, this.returnUrl);
    window.location.href = Constants.SSO_IS_AUTH_URL + "/oauth2/authorize?client_id=" + Constants.SSO_CLIENT_ID + "&scope=openid&redirect_uri=" + encodeURIComponent(Constants.SSO_CALLBACK_URL) + "&response_type=code";
  }

}
