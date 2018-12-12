import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Constants } from '../../../common/util/constants';
import { User } from './User';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../authentication/guard/authentication.service';
import { CommonService } from '../../../common/util/common-service/common.service';
import { HeaderField } from '../../../common/util/header-field';
import { HeaderValue } from '../../../common/util/header-value';

/**
 * Examine the handling  of business requirements with User module
 */
@Injectable()
export class UserService extends CommonService {

    /**  the api url */
    UserApi = Constants.API_URL + "users";

    constructor(
        private http: Http,
        router: Router
    ) {
        super(router)
    }

    /**
     * @description create a new user
     * @param user the new user
     */
    create(user: User): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.post(this.UserApi,
            JSON.stringify(user), { headers: secureHeaders })
            .toPromise()
            .then(response => response.status as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

     /**
   * @description get page country
   * @param user the search restriction
   * @param page the paging restriction
   */
  searchUser(user: User, page: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.post(this.UserApi + "/search?page=" + page + "&size=" + Constants.PAGE_SIZE + "&type=1",
    user, { headers: secureHeaders })
        .toPromise()
        .then(response => response.json() as any)
        .catch(error => {
            return this.handleError(error);
        });
    return promise;
}

    /**
     * @description update the user
     * @param user the new user
     */
    update(user: User): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.put(this.UserApi,
            JSON.stringify(user), { headers: secureHeaders })
            .toPromise()
            .then(response => response.status as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
     * @description delete users by id
     * @param entityIds the list id 
     */
    deleteCountriesById(entityIds: number[]): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var test = JSON.stringify(entityIds);
        var promise = this.http.delete(this.UserApi + "/delete-multiple/"+ entityIds, { headers: secureHeaders })
            .toPromise()
            .then(response => response.status as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
   * @description get page user
   * @param user the search restriction
   * @param page the paging restriction
   */
    getPageUser(user: User, page: number): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        console.log(this.UserApi + "?page=" + page+"&size="+Constants.PAGE_SIZE+"&type=1")
        var promise = this.http.get(this.UserApi + "?page=" + page+"&size="+Constants.PAGE_SIZE+"&type=1", { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                console.log('aaa')
                return this.handleError(error);
            });
        
        return promise;
    }

    /**
     * @description get list user
     */
    getListUser(): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.UserApi + "/all?type=-1", { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
     * @description hàm trả về thông tin 1 User
     * @param id id của User
     */
    findOne(id: number): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.UserApi + "/" + id, { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

}
