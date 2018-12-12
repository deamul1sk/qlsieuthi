import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Constants } from '../../../common/util/constants';
import { Product } from './product';

/**
 * @target: Dùng để định nghĩa forms: tạo, sửa, chi tiết
 */
export class ProductForm {
    /**
     * @description Định nghĩa form tạo
     * @param fb 
     */
    static productForm(fb: FormBuilder, business: string): FormGroup {
        var productForm: FormGroup;
        
        productForm = fb.group({
            id: "",
            code: ["", Validators.compose([
                Validators.required,
                Validators.maxLength(10),
                Validators.pattern(Constants.CODE_PATTERN)
            ])],
            name: ["", Validators.compose([
                Validators.required,
                Validators.maxLength(256),
                Validators.pattern(Constants.NAME_PATTERN)
            ])],
            category: ["", Validators.compose([
                Validators.maxLength(256),
                Validators.pattern(Constants.NAME_PATTERN)
            ])],
            price: ["", Validators.compose([
                Validators.maxLength(256),
                // Validators.pattern(Constants.PRICE_PATTERN)
            ])]
        });
        return productForm;
    }

    // 
    /**
     * @description : Đặt giá trị cho form Update
     * @param updateForm : form Update cần set giá trị
     * @param product : đối tượng đích
     */
    static bindingData(productForm: FormGroup, product: Product) {
        productForm.setValue({
            id: product.id,
            code: product.code,
            name: product.name,
            category: product.category,
            price: product.price
        });
    }
}