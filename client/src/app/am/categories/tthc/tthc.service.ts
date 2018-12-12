import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Constants } from '../../../common/util/constants';
import { TTHC } from './TTHC';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../authentication/guard/authentication.service';
import { CommonService } from '../../../common/util/common-service/common.service';
import { HeaderField } from '../../../common/util/header-field';
import { HeaderValue } from '../../../common/util/header-value';

/**
 * Examine the handling  of business requirements with TTHC module
 */
@Injectable()
export class TTHCService extends CommonService {

    /**  the api url */
    TTHCApi = Constants.API_URL + "tthcs";

    constructor(
        private http: Http,
        router: Router
    ) {
        super(router)
    }

    /**
     * @description create a new tthc
     * @param tthc the new tthc
     */
    create(tthc: TTHC): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.post(this.TTHCApi,
            JSON.stringify(tthc), { headers: secureHeaders })
            .toPromise()
            .then(response => response.status as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

     /**
   * @description get page country
   * @param tthc the search restriction
   * @param page the paging restriction
   */
  searchTTHC(tthc: TTHC, page: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.post(this.TTHCApi + "/search?page=" + page + "&size=" + Constants.PAGE_SIZE + "&type=1",
    tthc, { headers: secureHeaders })
        .toPromise()
        .then(response => response.json() as any)
        .catch(error => {
            return this.handleError(error);
        });
    return promise;
}

    /**
     * @description update the tthc
     * @param tthc the new tthc
     */
    update(tthc: TTHC): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.put(this.TTHCApi,
            JSON.stringify(tthc), { headers: secureHeaders })
            .toPromise()
            .then(response => response.status as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
     * @description delete tthcs by id
     * @param entityIds the list id 
     */
    deleteCountriesById(entityIds: number[]): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var test = JSON.stringify(entityIds);
        var promise = this.http.delete(this.TTHCApi + "/delete-multiple/"+ entityIds, { headers: secureHeaders })
            .toPromise()
            .then(response => response.status as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
   * @description get page tthc
   * @param tthc the search restriction
   * @param page the paging restriction
   */
    getPageTTHC(tthc: TTHC, page: number): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.TTHCApi + "?page=" + page+"&size="+Constants.PAGE_SIZE+"&type=1", { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
     * @description get list tthc
     */
    getListTTHC(): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.TTHCApi + "/all?type=-1", { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
     * @description hàm trả về thông tin 1 TTHC
     * @param id id của TTHC
     */
    findOne(id: number): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.TTHCApi + "/" + id, { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

}
