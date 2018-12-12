import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResponseMessageComponent } from '../../../common/util/response-message/response-message.component';
import { UserForm } from './user-form.component';

import { UserService } from './user.service';
import { DialogService } from '../../../common/dialog/dialog.service';
import { DataTable } from 'angular2-datatable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';

import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthGuardSubmenu } from '../../../authentication/guard/auth.guard-submenu';
import { Constants } from '../../../common/util/constants';
import { PageInfo } from '../../../common/util/page-info';
import { User } from './user';
import { ExcelExportService } from '../../../common/util/common-service/excel.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    providers: [UserService, DialogService, DataTable]
})

/**
 * @description: Coordinator quản lý bảng 'User'
 */
export class UserListComponent implements OnInit {
    // user page
    userInfo: PageInfo<User[]>;
    // list user 
    users: User[];
    // total page
    totalPages: number;
    // curent page
    currentPage = 0;
    // page sizw
    pageLength: number;
    // toal elements
    totalElements: number;
    // >filter search.
    filterForm: FormGroup;
    // search restriction
    searchObject: User;
    // >checker.
    checkAllItemFlag = false;
    currentPageView: number;
    fromElement: number;
    toElement: number;

    numberDeleteItems = 0;

    listStatus = Constants.STATUS_LIST;

    constructor(
        private userService: UserService,
        private exportExcelService: ExcelExportService,
        private dialogService: DialogService,
        private fb: FormBuilder,
        private router: Router,
        private translate: TranslateService,
        private authGuardSubmenu: AuthGuardSubmenu,
        public toastr: ToastsManager, vcr: ViewContainerRef
    ) { this.toastr.setRootViewContainerRef(vcr); }

    ngOnInit() {
        // initialize forms.
        this.filterForm = UserForm.userForm(this.fb, '');
        // initialize object
        this.searchObject = new User();
        // get datas.
        this.getPageUser(this.searchObject, this.currentPage);
    }

    /**
     * @description: Hàm tìm kiếm
     * @param user: Thông tin tìm kiếm
     * @param page: số trang muốn lấy
     */
    getPageUser(user: User, page: number) {
        this.searchObject = user;
        
        this.userService.getPageUser(user, page)
            .then(response => {
                console.log(response);
                this.userInfo = response.data;
                this.users = this.userInfo.content;
                this.pageLength = this.userInfo.content.length;
                this.totalElements = this.userInfo.totalElements;
                this.totalPages = this.userInfo.totalPages;
                if (!(this.totalPages > 0)) {
                    this.currentPage = -1;
                }
                this.setCurrentPage();
                this.countNumberDeleteItems();
            }).catch(
                error => {
                    console.log(error);
                });
    }

     /**
     * @description: Hàm tìm kiếm
     * @param user: Thông tin tìm kiếm
     * @param page: số trang muốn lấy
     */
    searchUser(user: User, page: number) {
        this.searchObject = user;
        this.userService.searchUser(user, page)
            .then(response => {
                console.log(response);
                this.userInfo = response.data;
                this.users = this.userInfo.content;
                console.log(this.users[0].role)
                this.pageLength = this.userInfo.content.length;
                this.totalElements = this.userInfo.totalElements;
                this.totalPages = this.userInfo.totalPages;
                if (!(this.totalPages > 0)) {
                    this.currentPage = -1;
                }
                this.setCurrentPage();
                this.countNumberDeleteItems();
            }).catch(
                error => {
                    console.log(error);
                });
    }

    

    /**
     * @description: Coordinator quản lý việc chuyển trang
     * @param page: số trang
     */
    choosePageNumber(page) {
        debugger;
        var flag = true;
        var pageNumber;

        if(page.valueAsNumber != null) {
            if(isNaN(page.valueAsNumber)) {
                flag = false;
                page.value = this.currentPage + 1;
                // this.currentPageView = 1;
            } else {
                pageNumber = page.value - 1;
            }
        } else {
            pageNumber = page;
        }

        if (flag == true && this.currentPage > pageNumber && pageNumber < 0) {
            pageNumber = 0;
        }
        if (flag == true && this.currentPage < pageNumber && pageNumber > this.totalPages-1) {
            pageNumber = this.totalPages-1;
        }
        if (flag == true && !Number.isInteger(pageNumber)) {
            flag = false;
            page.value = this.currentPage + 1;
        }
        if (flag == true) {
            
            this.currentPage = pageNumber;
            this.getPageUser(this.searchObject, this.currentPage);
            page.value = pageNumber + 1;
        }
    }

    exportExcel() {
        window.open(this.userService.UserApi + "/export-excel", "_blank");
    }
    
    private setCurrentPage() {
        if (this.userInfo.numberOfElements > 0) {
            this.currentPageView = this.userInfo.number + 1;
        } else {
            this.currentPageView = 0;
        }
        var numberOfElements = this.userInfo.numberOfElements;
        var size = this.userInfo.size;
        this.fromElement = (this.currentPageView - 1) * size + 1;
        this.toElement = (this.currentPageView - 1) * size + numberOfElements;
        if (this.toElement < 1) {
            this.fromElement = 0;
            this.toElement = 0;
        }
    }
    /**
     * @description: Dùng để xóa 1 bản ghi
     * @param userId 
     */
    delete(id: number) {
        var entityIds = [];
        entityIds.push(id);
        this.dialogService
            .confirm()
            .subscribe(response => {
                if (response == true) {
                    this.userService.deleteCountriesById(entityIds)
                        .then(response => {
                            let message;
                            this.translate.get('Message.DeleteSuccess').subscribe((res: string) => {
                                message = res;
                            });
                            this.toastr.success('', message, { dismiss: 'controlled' })
                                .then((toast: Toast) => {
                                    setTimeout(() => {
                                        this.toastr.dismissToast(toast);
                                    }, 3000);
                                });
                                this.getPageUser(this.searchObject, this.currentPage);
                        })
                        .catch(error => {
                            let message;
                            this.translate.get('Message.DeleteFail').subscribe((res: string) => {
                                message = res;
                            });
                            this.toastr.error('', message, { dismiss: 'controlled' })
                                .then((toast: Toast) => {
                                    setTimeout(() => {
                                        this.toastr.dismissToast(toast);
                                    }, 3000);
                                });
                        });
                }
            })
    }

    /**
     * @description: Check tất cả items khi click ô checkbox all.
     */
    checkAllItem() {
        this.checkAllItemFlag = !this.checkAllItemFlag;
        this.users.forEach(item => {
            item.checked = this.checkAllItemFlag;
        });
    }

    /**
     * @description: Xóa các items được chọn.
     */
    deleteCheckedItems() {
        var entityIds = [];
        this.users.forEach(item => {
            if (item.checked == true) {
                entityIds.push(item.id);
            }
        });
        if (entityIds.length > 0) {
            this.dialogService.confirm()
                .subscribe(response => {
                    if (response == true) {
                        this.userService.deleteCountriesById(entityIds)
                            .then(response => {
                                let message;
                                this.translate.get('Message.DeleteSuccess').subscribe((res: string) => {
                                    message = res;
                                });
                                this.checkAllItemFlag = false;
                                this.getPageUser(this.searchObject, this.currentPage);
                                this.numberDeleteItems = 0;
                                this.toastr.success('', message, { dismiss: 'controlled' })
                                    .then((toast: Toast) => {
                                        setTimeout(() => {
                                            this.toastr.dismissToast(toast);
                                        }, 3000);
                                    });
                            })
                            .catch(error => {
                                let message;
                                this.translate.get('Message.DeleteFail').subscribe((res: string) => {
                                    message = res;
                                });
                                this.numberDeleteItems = 0;
                                this.checkAllItemFlag = false;
                                this.getPageUser(this.searchObject, this.currentPage);
                                this.toastr.error('', message, { dismiss: 'controlled' })
                                    .then((toast: Toast) => {
                                        setTimeout(() => {
                                            this.toastr.dismissToast(toast);
                                        }, 3000);
                                    });
                            });
                    }
                })
        }
    }

    countNumberDeleteItems() {
        this.numberDeleteItems = 0;
        this.users.forEach(item => {
            if (item.checked == true) {
                this.numberDeleteItems += 1;
            }
        });
    }

    getNumberDeleteItems(): number {
        return this.numberDeleteItems;
    }
     
    // To Authorize User
    isAuthoriziedNavigation(): boolean {
        var isAuthorizied = this.authGuardSubmenu.isAuthoriziedWithCurrentUrl(this.router.url);
        return isAuthorizied;
    }
}
