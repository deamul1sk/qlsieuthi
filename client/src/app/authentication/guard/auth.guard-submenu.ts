import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserAuthentication } from './user-authentication';
import { Constants } from '../../common/util/constants';

@Injectable()
export class AuthGuardSubmenu implements CanActivate {
    currentUser: UserAuthentication;
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // var url = state.url;
        // // console.log("AuthGuardSubmenu: " + url);
        // var isAuthorizied = this.isAuthoriziedWithCurrentUrl(url);
        // if(isAuthorizied==true){
        //     return true;
        // }

        // // not logged in so redirect to login page with the return url
        // this.router.navigate(['/system']);
        return true;
    }

    isAuthoriziedWithCurrentUrl(url: string): boolean{
        // try{
        //     this.currentUser = JSON.parse(localStorage.getItem(Constants.CURRENT_USER));
        //     var mbsNavigationRoles = this.currentUser.data.mbsNavigationRoles;
        //     for(var i=0; i<mbsNavigationRoles.length; i++){
        //         var navigationRoleElement = mbsNavigationRoles[i];
        //         var mbsNavigation = navigationRoleElement.mbsNavigation;
        //         var router: string;
        //         router = mbsNavigation.urlRewrite;
        //         if(url.startsWith(router) && navigationRoleElement.type==2){
        //            return true;
        //         }
        //     }
        // }catch(e){

        // }
        return true;
    }

    redirectToSystemPage(url: string){
        if(this.isAuthoriziedWithCurrentUrl(url)==false){
            this.router.navigate(['/system']);
        }
    }
}