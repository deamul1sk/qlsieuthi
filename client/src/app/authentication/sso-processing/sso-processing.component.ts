import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../guard/authentication.service';
import { ResponseDataDTO } from '../../common/dto/ResponseDataDTO';
import { Constants } from '../../common/util/constants';
import { Console } from '@angular/core/src/console';

@Component({
  selector: 'app-sso-processing',
  templateUrl: './sso-processing.component.html',
  styleUrls: ['./sso-processing.component.css'],
  providers: [AuthenticationService]
})
export class SsoProcessingComponent implements OnInit {

  private currentUrl: string;
  private accessToken: string;
  private refreshToken: string;
  private expireTime: string;
  responseData: ResponseDataDTO<null>;
  hasError: boolean = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activatedRoute: ActivatedRoute, private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.returnUrl = localStorage.getItem(Constants.RETURN_URL);
    this.getAuthorizationCode();

    this.authenticationService.getUserInfo()
      .then(response => {
        this.accessToken = response.accessToken;
        this.refreshToken = response.refreshToken;
        this.expireTime = response.expireTime;
        let now = new Date().getTime();
        let expireTime = now + (+this.expireTime) * 1000;

        localStorage.setItem(Constants.ACCESS_TOKEN, "Bearer " + this.accessToken);
        localStorage.setItem(Constants.EXPIRE_TIME, expireTime.toString());
        localStorage.setItem(Constants.REFRESH_TOKEN, this.refreshToken);
        localStorage.setItem(Constants.IS_AUTHENTIC, "true");

        this.responseData = new ResponseDataDTO(response.statusCode, response.message, response.data);
        if (this.responseData.statusCode == 200) {
          localStorage.setItem(Constants.CURRENT_USER, JSON.stringify(response));
          this.router.navigate([this.returnUrl]);
        }
      })
      .catch(error => {
        localStorage.setItem(Constants.IS_AUTHENTIC, "false");
        // this.router.navigate(["/"]);
      });
  }

  getAuthorizationCode() {
    this.activatedRoute.queryParams.subscribe(params => {
      let authorizationCode = params['code'];
      localStorage.setItem(Constants.AUTHORIZATION_CODE, authorizationCode);
    });
  }

}
