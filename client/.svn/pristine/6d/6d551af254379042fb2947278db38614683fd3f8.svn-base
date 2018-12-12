import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Constants } from '../../../common/util/constants';

@Injectable()
export class MbsNavigationsService {
    mbsNavigationApi = Constants.API_URL + "navigations";
    constructor(
        private http: Http,
    ) { }

    findAllMbsNavigations(): Promise<any> {
        var promise = this.http.get("http://localhost:8888/savis/categories/api/v1/navigations")
          .toPromise()
          .then(response => response.json() as any)
          .catch(error => error.json() as any);
        return promise;
    }
}