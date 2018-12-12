import { Router } from "@angular/router/src/router";
import { Constants } from '../constants';

export class CommonService {

    constructor(protected router: Router) { }

    /**
     * @description Error handling when calling service from server
     * @param error the error infomation
     */
    protected handleError(error: any): Promise<any> {
        error = error.json();
        // if stauts error is 403 (Access Denied)
        if (error.status == 403 || error.status == 401) {
            this.router.navigate(['/auth']);
        }
        return Promise.reject(error);
    }

    /**
     * @description get accessToken from localStorage
     * @returns accessToken
     */
    protected getAccessToken(): string {
        let accessToken = localStorage.getItem(Constants.ACCESS_TOKEN);
        return accessToken;
    }
}