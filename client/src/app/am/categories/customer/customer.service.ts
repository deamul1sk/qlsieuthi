import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Constants } from '../../../common/util/constants';
import { Customer } from './Customer';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../authentication/guard/authentication.service';
import { CommonService } from '../../../common/util/common-service/common.service';
import { HeaderField } from '../../../common/util/header-field';
import { HeaderValue } from '../../../common/util/header-value';

/**
 * Examine the handling  of business requirements with Customer module
 */
@Injectable()
export class CustomerService extends CommonService {

    /**  the api url */
    CustomerApi = Constants.API_URL + "customers";

    constructor(
        private http: Http,
        router: Router
    ) {
        super(router)
    }

    /**
     * @description create a new customer
     * @param customer the new customer
     */
    create(customer: Customer): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.post(this.CustomerApi,
            JSON.stringify(customer), { headers: secureHeaders })
            .toPromise()
            .then(response => response.status as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

     /**
   * @description get page country
   * @param customer the search restriction
   * @param page the paging restriction
   */
  searchCustomer(customer: Customer, page: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.post(this.CustomerApi + "/search?page=" + page + "&size=" + Constants.PAGE_SIZE + "&type=1",
    customer, { headers: secureHeaders })
        .toPromise()
        .then(response => response.json() as any)
        .catch(error => {
            return this.handleError(error);
        });
    return promise;
}

    /**
     * @description update the customer
     * @param customer the new customer
     */
    update(customer: Customer): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.put(this.CustomerApi,
            JSON.stringify(customer), { headers: secureHeaders })
            .toPromise()
            .then(response => response.status as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
     * @description delete customers by id
     * @param entityIds the list id 
     */
    deleteCountriesById(entityIds: number[]): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var test = JSON.stringify(entityIds);
        var promise = this.http.delete(this.CustomerApi + "/delete-multiple/"+ entityIds, { headers: secureHeaders })
            .toPromise()
            .then(response => response.status as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
   * @description get page customer
   * @param customer the search restriction
   * @param page the paging restriction
   */
    getPageCustomer(customer: Customer, page: number): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        console.log(this.CustomerApi + "?page=" + page+"&size="+Constants.PAGE_SIZE+"&type=1")
        var promise = this.http.get(this.CustomerApi + "?page=" + page+"&size="+Constants.PAGE_SIZE+"&type=1", { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                console.log('aaa')
                return this.handleError(error);
            });
        
        return promise;
    }

    /**
     * @description get list customer
     */
    getListCustomer(): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.CustomerApi + "/all?type=-1", { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
     * @description hàm trả về thông tin 1 Customer
     * @param id id của Customer
     */
    findOne(id: number): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.CustomerApi + "/" + id, { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

}
