import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResponseMessageComponent } from '../../../common/util/response-message/response-message.component';
import { ProductForm } from './product-form.component';

import { ProductService } from './product.service';
import { DialogService } from '../../../common/dialog/dialog.service';
import { DataTable } from 'angular2-datatable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';

import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthGuardSubmenu } from '../../../authentication/guard/auth.guard-submenu';
import { Constants } from '../../../common/util/constants';
import { PageInfo } from '../../../common/util/page-info';
import { Product } from './product';
import { ExcelExportService } from '../../../common/util/common-service/excel.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    providers: [ProductService, DialogService, DataTable]
})

/**
 * @description: Coordinator quản lý bảng 'Product'
 */
export class ProductListComponent implements OnInit {
    // product page
    productInfo: PageInfo<Product[]>;
    // list product 
    products: Product[];
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
    searchObject: Product;
    // >checker.
    checkAllItemFlag = false;
    currentPageView: number;
    fromElement: number;
    toElement: number;

    numberDeleteItems = 0;

    listStatus = Constants.STATUS_LIST;

    constructor(
        private productService: ProductService,
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
        this.filterForm = ProductForm.productForm(this.fb, '');
        // initialize object
        this.searchObject = new Product();
        // get datas.
        this.getPageProduct(this.searchObject, this.currentPage);
    }

    /**
     * @description: Hàm tìm kiếm
     * @param product: Thông tin tìm kiếm
     * @param page: số trang muốn lấy
     */
    getPageProduct(product: Product, page: number) {
        this.searchObject = product;
        
        this.productService.getPageProduct(product, page)
            .then(response => {
                console.log(response);
                this.productInfo = response.data;
                this.products = this.productInfo.content;
                this.pageLength = this.productInfo.content.length;
                this.totalElements = this.productInfo.totalElements;
                this.totalPages = this.productInfo.totalPages;
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
     * @param product: Thông tin tìm kiếm
     * @param page: số trang muốn lấy
     */
    searchProduct(product: Product, page: number) {
        this.searchObject = product;
        this.productService.searchProduct(product, page)
            .then(response => {
                console.log(response);
                this.productInfo = response.data;
                this.products = this.productInfo.content;
                
                this.pageLength = this.productInfo.content.length;
                this.totalElements = this.productInfo.totalElements;
                this.totalPages = this.productInfo.totalPages;
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
            this.getPageProduct(this.searchObject, this.currentPage);
            page.value = pageNumber + 1;
        }
    }

    exportExcel() {
        window.open(this.productService.ProductApi + "/export-excel", "_blank");
    }
    
    private setCurrentPage() {
        if (this.productInfo.numberOfElements > 0) {
            this.currentPageView = this.productInfo.number + 1;
        } else {
            this.currentPageView = 0;
        }
        var numberOfElements = this.productInfo.numberOfElements;
        var size = this.productInfo.size;
        this.fromElement = (this.currentPageView - 1) * size + 1;
        this.toElement = (this.currentPageView - 1) * size + numberOfElements;
        if (this.toElement < 1) {
            this.fromElement = 0;
            this.toElement = 0;
        }
    }
    /**
     * @description: Dùng để xóa 1 bản ghi
     * @param productId 
     */
    delete(id: number) {
        var entityIds = [];
        entityIds.push(id);
        this.dialogService
            .confirm()
            .subscribe(response => {
                if (response == true) {
                    this.productService.deleteCountriesById(entityIds)
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
                                this.getPageProduct(this.searchObject, this.currentPage);
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
        this.products.forEach(item => {
            item.checked = this.checkAllItemFlag;
        });
    }

    /**
     * @description: Xóa các items được chọn.
     */
    deleteCheckedItems() {
        var entityIds = [];
        this.products.forEach(item => {
            if (item.checked == true) {
                entityIds.push(item.id);
            }
        });
        if (entityIds.length > 0) {
            this.dialogService.confirm()
                .subscribe(response => {
                    if (response == true) {
                        this.productService.deleteCountriesById(entityIds)
                            .then(response => {
                                let message;
                                this.translate.get('Message.DeleteSuccess').subscribe((res: string) => {
                                    message = res;
                                });
                                this.checkAllItemFlag = false;
                                this.getPageProduct(this.searchObject, this.currentPage);
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
                                this.getPageProduct(this.searchObject, this.currentPage);
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
        this.products.forEach(item => {
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
