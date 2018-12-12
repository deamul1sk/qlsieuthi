import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Constants } from '../../../common/util/constants';
import { TTHC } from './tthc';

/**
 * @target: Dùng để định nghĩa forms: tạo, sửa, chi tiết
 */
export class TTHCForm {
    /**
     * @description Định nghĩa form tạo
     * @param fb 
     */
    static tthcForm(fb: FormBuilder, business: string): FormGroup {
        var tthcForm: FormGroup;
        
        tthcForm = fb.group({
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
            abbreviation: ["", Validators.compose([
                Validators.maxLength(256)
            ])],
            no: [0, Validators.compose([
                Validators.maxLength(10)
            ])],
            description: ["", Validators.compose([
                Validators.maxLength(1024)
            ])],
            status: [1, Validators.compose([
                Validators.required,
                Validators.maxLength(10)
            ])],
        });
        return tthcForm;
    }

    // 
    /**
     * @description : Đặt giá trị cho form Update
     * @param updateForm : form Update cần set giá trị
     * @param tthc : đối tượng đích
     */
    static bindingData(tthcForm: FormGroup, tthc: TTHC) {
        tthcForm.setValue({
            id: tthc.id,
            code: tthc.code,
            name: tthc.name,
            abbreviation: tthc.abbreviation,
            no: tthc.no,
            description: tthc.description,
            status: tthc.status,
        });
    }
}