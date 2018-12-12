import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import { HttpHeaders } from '@angular/common/http';
import { Constants } from '../../common/util/constants';
import { CommonService } from '../../common/util/common-service/common.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService extends CommonService{
  userApi = Constants.API_URL + "auth";
  constructor(
    private http: Http,
    router: Router
  ) {
    super(router)
  }

  logout(): Promise<any> {
    // remove user from local storage to log user out
    var secureHeaders = new Headers();
    secureHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    var promise = this.http.post(this.userApi + "/logout", { headers: secureHeaders })
      .toPromise()
      .then(response => response.json() as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  getUserInfo() {
    debugger
    let authorizationCode = localStorage.getItem(Constants.AUTHORIZATION_CODE);
    var promise = this.http.post(Constants.API_URL + "sso/getUserInfo",authorizationCode)
      .toPromise()
      .then(response => response.json() as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

}

