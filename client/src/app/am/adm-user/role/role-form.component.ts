import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Constants } from '../../../common/util/constants';
import { Role } from './role';

/**
 * @target: Dùng để định nghĩa forms: tạo, sửa, chi tiết
 */
export class RoleForm {
    /**
     * @description Định nghĩa form tạo
     * @param fb 
     */
    static roleForm(fb: FormBuilder, business: string): FormGroup {
        var roleForm: FormGroup;
        
        roleForm = fb.group({
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
            ])]
        });
        return roleForm;
    }

    // 
    /**
     * @description : Đặt giá trị cho form Update
     * @param updateForm : form Update cần set giá trị
     * @param role : đối tượng đích
     */
    static bindingData(roleForm: FormGroup, role: Role) {
        roleForm.setValue({
            id: role.id,
            code: role.code,
            name: role.name
        });
    }
}