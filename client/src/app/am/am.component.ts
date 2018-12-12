import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/guard/authentication.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageItem, LanguageItemList } from '../i18n-setting';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Http } from '@angular/http';
import { User } from '../authentication/guard/user';
import { PageInfo } from '../common/util/page-info';
import { Constants } from '../common/util/constants';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-am',
  templateUrl: './am.component.html',
  styleUrls: ['./am.component.css'],
  providers: [Idle]
})
export class AmComponent implements OnInit {

  currentUser: User;

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;

  private expireTime: number = 0;
  private timer;
  private sub;

  ListLanguage: LanguageItem[];
  SelectedLanguage: LanguageItem;
  constructor(
    private http: Http,
    private idle: Idle,
    private authenticationService: AuthenticationService,
    private router: Router,
    private translate: TranslateService,
  ) {
    this.ListLanguage = LanguageItemList;
    translate.use(localStorage.getItem(Constants.KEY_LANGUAGE));
    // Get current language
    this.ListLanguage.forEach(lang => {
      if (lang.Key === translate.currentLang) {
        this.SelectedLanguage = lang;
      }
    });

    idle.setIdle(5);
    idle.setTimeout(10);
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');


    idle.onTimeout.subscribe(() => {
      alert('Timeout');
      this.idleState = 'Timed out!';
      this.timedOut = true;
      localStorage.clear();
      this.router.navigate(['/auth', { sessionExpirate: 'true' }]);
    });
    // this.countdownTimer();
  }

  ngOnInit() {
    this.currentUser = new User("LongTT","LongTT","LongTT","LongTT")
    // this.currentUser = new User(JSON.parse(localStorage.getItem(Constants.CURRENT_USER)).data.mbsUser.username, JSON.parse(localStorage.getItem(Constants.CURRENT_USER)).data.mbsUser.fullname, JSON.parse(localStorage.getItem(Constants.CURRENT_USER)).data.mbsUser.email, JSON.parse(localStorage.getItem(Constants.CURRENT_USER)).data.mbsUser.mobile);
  }

  logout() {
    localStorage.removeItem(Constants.IS_AUTHENTIC);
    localStorage.removeItem(Constants.ACCESS_TOKEN);
    localStorage.removeItem(Constants.SESSION_STATE);
    localStorage.removeItem(Constants.CURRENT_USER);
    window.location.href = Constants.SSO_LOGOUT_URL;
  }

  onSelectLanguage(lang: LanguageItem) {
    this.SelectedLanguage = lang;
    localStorage.setItem(Constants.KEY_LANGUAGE, lang.Key);
    window.location.reload();
  }

  /**
   * @param expireTime the time tokens expire
   */
  countdownTimer() {
    this.expireTime = +localStorage.getItem(Constants.EXPIRE_TIME);
    this.timer = Observable.timer(0,1000);
    // subscribing to a observable returns a subscription object
    this.sub = this.timer.subscribe(t => this.checkExpiredToken());
  }

  /**
   * @description Check for expired token
   * if token is expired, redirect to login page
   */
  checkExpiredToken(){
    let now = new Date().getTime();
    if(this.expireTime <= now){
      localStorage.removeItem(Constants.IS_AUTHENTIC);
      localStorage.removeItem(Constants.ACCESS_TOKEN);
      localStorage.removeItem(Constants.SESSION_STATE);
      localStorage.removeItem(Constants.CURRENT_USER);
      this.router.navigate(['/auth']);
    }
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}

