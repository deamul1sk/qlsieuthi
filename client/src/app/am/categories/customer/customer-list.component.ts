import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResponseMessageComponent } from '../../../common/util/response-message/response-message.component';
import { CustomerForm } from './customer-form.component';

import { CustomerService } from './customer.service';
import { DialogService } from '../../../common/dialog/dialog.service';
import { DataTable } from 'angular2-datatable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';

import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthGuardSubmenu } from '../../../authentication/guard/auth.guard-submenu';
import { Constants } from '../../../common/util/constants';
import { PageInfo } from '../../../common/util/page-info';
import { Customer } from './customer';
import { ExcelExportService } from '../../../common/util/common-service/excel.service';

@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    providers: [CustomerService, DialogService, DataTable]
})

/**
 * @description: Coordinator quản lý bảng 'Customer'
 */
export class CustomerListComponent implements OnInit {
    // customer page
    customerInfo: PageInfo<Customer[]>;
    // list customer 
    customers: Customer[];
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
    searchObject: Customer;
    // >checker.
    checkAllItemFlag = false;
    currentPageView: number;
    fromElement: number;
    toElement: number;

    numberDeleteItems = 0;

    listStatus = Constants.STATUS_LIST;

    constructor(
        private customerService: CustomerService,
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
        this.filterForm = CustomerForm.customerForm(this.fb, '');
        // initialize object
        this.searchObject = new Customer();
        // get datas.
        this.getPageCustomer(this.searchObject, this.currentPage);
    }

    /**
     * @description: Hàm tìm kiếm
     * @param customer: Thông tin tìm kiếm
     * @param page: số trang muốn lấy
     */
    getPageCustomer(customer: Customer, page: number) {
        this.searchObject = customer;
        
        this.customerService.getPageCustomer(customer, page)
            .then(response => {
                console.log(response);
                this.customerInfo = response.data;
                this.customers = this.customerInfo.content;
                this.pageLength = this.customerInfo.content.length;
                this.totalElements = this.customerInfo.totalElements;
                this.totalPages = this.customerInfo.totalPages;
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
     * @param customer: Thông tin tìm kiếm
     * @param page: số trang muốn lấy
     */
    searchCustomer(customer: Customer, page: number) {
        this.searchObject = customer;
        this.customerService.searchCustomer(customer, page)
            .then(response => {
                console.log(response);
                this.customerInfo = response.data;
                this.customers = this.customerInfo.content;
                
                this.pageLength = this.customerInfo.content.length;
                this.totalElements = this.customerInfo.totalElements;
                this.totalPages = this.customerInfo.totalPages;
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
            this.getPageCustomer(this.searchObject, this.currentPage);
            page.value = pageNumber + 1;
        }
    }

    exportExcel() {
        window.open(this.customerService.CustomerApi + "/export-excel", "_blank");
    }
    
    private setCurrentPage() {
        if (this.customerInfo.numberOfElements > 0) {
            this.currentPageView = this.customerInfo.number + 1;
        } else {
            this.currentPageView = 0;
        }
        var numberOfElements = this.customerInfo.numberOfElements;
        var size = this.customerInfo.size;
        this.fromElement = (this.currentPageView - 1) * size + 1;
        this.toElement = (this.currentPageView - 1) * size + numberOfElements;
        if (this.toElement < 1) {
            this.fromElement = 0;
            this.toElement = 0;
        }
    }
    /**
     * @description: Dùng để xóa 1 bản ghi
     * @param customerId 
     */
    delete(id: number) {
        var entityIds = [];
        entityIds.push(id);
        this.dialogService
            .confirm()
            .subscribe(response => {
                if (response == true) {
                    this.customerService.deleteCountriesById(entityIds)
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
                                this.getPageCustomer(this.searchObject, this.currentPage);
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
        this.customers.forEach(item => {
            item.checked = this.checkAllItemFlag;
        });
    }

    /**
     * @description: Xóa các items được chọn.
     */
    deleteCheckedItems() {
        var entityIds = [];
        this.customers.forEach(item => {
            if (item.checked == true) {
                entityIds.push(item.id);
            }
        });
        if (entityIds.length > 0) {
            this.dialogService.confirm()
                .subscribe(response => {
                    if (response == true) {
                        this.customerService.deleteCountriesById(entityIds)
                            .then(response => {
                                let message;
                                this.translate.get('Message.DeleteSuccess').subscribe((res: string) => {
                                    message = res;
                                });
                                this.checkAllItemFlag = false;
                                this.getPageCustomer(this.searchObject, this.currentPage);
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
                                this.getPageCustomer(this.searchObject, this.currentPage);
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
        this.customers.forEach(item => {
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
