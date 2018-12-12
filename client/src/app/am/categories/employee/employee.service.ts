import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Constants } from '../../../common/util/constants';
import { Employee } from './Employee';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../authentication/guard/authentication.service';
import { CommonService } from '../../../common/util/common-service/common.service';
import { HeaderField } from '../../../common/util/header-field';
import { HeaderValue } from '../../../common/util/header-value';

/**
 * Examine the handling  of business requirements with Employee module
 */
@Injectable()
export class EmployeeService extends CommonService {

    /**  the api url */
    EmployeeApi = Constants.API_URL + "employees";

    constructor(
        private http: Http,
        router: Router
    ) {
        super(router)
    }

    /**
     * @description create a new employee
     * @param employee the new employee
     */
    create(employee: Employee): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.post(this.EmployeeApi,
            JSON.stringify(employee), { headers: secureHeaders })
            .toPromise()
            .then(response => response.status as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

     /**
   * @description get page country
   * @param employee the search restriction
   * @param page the paging restriction
   */
  searchEmployee(employee: Employee, page: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.post(this.EmployeeApi + "/search?page=" + page + "&size=" + Constants.PAGE_SIZE + "&type=1",
    employee, { headers: secureHeaders })
        .toPromise()
        .then(response => response.json() as any)
        .catch(error => {
            return this.handleError(error);
        });
    return promise;
}

    /**
     * @description update the employee
     * @param employee the new employee
     */
    update(employee: Employee): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.put(this.EmployeeApi,
            JSON.stringify(employee), { headers: secureHeaders })
            .toPromise()
            .then(response => response.status as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
     * @description delete employees by id
     * @param entityIds the list id 
     */
    deleteCountriesById(entityIds: number[]): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var test = JSON.stringify(entityIds);
        var promise = this.http.delete(this.EmployeeApi + "/delete-multiple/"+ entityIds, { headers: secureHeaders })
            .toPromise()
            .then(response => response.status as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
   * @description get page employee
   * @param employee the search restriction
   * @param page the paging restriction
   */
    getPageEmployee(employee: Employee, page: number): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        console.log(this.EmployeeApi + "?page=" + page+"&size="+Constants.PAGE_SIZE+"&type=1")
        var promise = this.http.get(this.EmployeeApi + "?page=" + page+"&size="+Constants.PAGE_SIZE+"&type=1", { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                console.log('aaa')
                return this.handleError(error);
            });
        
        return promise;
    }

    /**
     * @description get list employee
     */
    getListEmployee(): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.EmployeeApi + "/all?type=-1", { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
     * @description hàm trả về thông tin 1 Employee
     * @param id id của Employee
     */
    findOne(id: number): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.EmployeeApi + "/" + id, { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

}
