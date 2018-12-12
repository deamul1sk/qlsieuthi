import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Constants } from '../../../common/util/constants';
import { Right } from './right';

/**
 * @target: Dùng để định nghĩa forms: tạo, sửa, chi tiết
 */
export class RightForm {
    /**
     * @description Định nghĩa form tạo
     * @param fb 
     */
    static rightForm(fb: FormBuilder, business: string): FormGroup {
        var rightForm: FormGroup;
        
        rightForm = fb.group({
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
            api: ["", Validators.compose([
                Validators.required,
                Validators.maxLength(256),
                Validators.pattern(Constants.NAME_PATTERN)
            ])]
        });
        return rightForm;
    }

    // 
    /**
     * @description : Đặt giá trị cho form Update
     * @param updateForm : form Update cần set giá trị
     * @param right : đối tượng đích
     */
    static bindingData(rightForm: FormGroup, right: Right) {
        rightForm.setValue({
            id: right.id,
            code: right.code,
            name: right.name,
            api: right.api
        });
    }
}