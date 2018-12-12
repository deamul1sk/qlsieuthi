import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Constants } from '../../../common/util/constants';
import { Customer } from './customer';

/**
 * @target: Dùng để định nghĩa forms: tạo, sửa, chi tiết
 */
export class CustomerForm {
    /**
     * @description Định nghĩa form tạo
     * @param fb 
     */
    static customerForm(fb: FormBuilder, business: string): FormGroup {
        var customerForm: FormGroup;
        
        customerForm = fb.group({
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
            phone: ["", Validators.compose([
                Validators.maxLength(256),
                Validators.pattern(Constants.PHONE_NUMBER_PATTERN)
            ])],
        });
        return customerForm;
    }

    // 
    /**
     * @description : Đặt giá trị cho form Update
     * @param updateForm : form Update cần set giá trị
     * @param customer : đối tượng đích
     */
    static bindingData(customerForm: FormGroup, customer: Customer) {
        customerForm.setValue({
            id: customer.id,
            code: customer.code,
            name: customer.name,
            phone: customer.phone
        });
    }
}