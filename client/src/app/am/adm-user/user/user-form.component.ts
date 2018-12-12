import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Constants } from '../../../common/util/constants';
import { User } from './user';

/**
 * @target: Dùng để định nghĩa forms: tạo, sửa, chi tiết
 */
export class UserForm {
    /**
     * @description Định nghĩa form tạo
     * @param fb 
     */
    static userForm(fb: FormBuilder, business: string): FormGroup {
        var userForm: FormGroup;
        
        userForm = fb.group({
            id: "",
            code: ["", Validators.compose([
                Validators.required,
                Validators.maxLength(10),
                Validators.pattern(Constants.CODE_PATTERN)
            ])],
            username: ["", Validators.compose([
                Validators.required,
                Validators.maxLength(256),
                Validators.pattern(Constants.USERNAME_PATTERN)
            ])],
            password: ["", Validators.compose([
                Validators.required,
                Validators.maxLength(256),
                Validators.pattern(Constants.USERNAME_PATTERN)
            ])],
            role: fb.group({
                id: ["", Validators.compose([
                    Validators.required,
                    Validators.min(10)
                ])]
            })
        });
        return userForm;
    }

    // 
    /**
     * @description : Đặt giá trị cho form Update
     * @param updateForm : form Update cần set giá trị
     * @param user : đối tượng đích
     */
    static bindingData(userForm: FormGroup, user: User) {
        userForm.setValue({
            id: user.id,
            code: user.code,
            username: user.username,
            password: user.password,
            role: {
                id: user.role.id
            }
        });
    }
}