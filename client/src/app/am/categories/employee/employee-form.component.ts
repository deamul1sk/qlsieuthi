import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Constants } from '../../../common/util/constants';
import { Employee } from './employee';

/**
 * @target: Dùng để định nghĩa forms: tạo, sửa, chi tiết
 */
export class EmployeeForm {
    /**
     * @description Định nghĩa form tạo
     * @param fb 
     */
    static employeeForm(fb: FormBuilder, business: string): FormGroup {
        var employeeForm: FormGroup;
        
        employeeForm = fb.group({
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
            user: fb.group({
                id: ["", Validators.compose([
                    Validators.required,
                    Validators.min(10)
                ])]
            })
        });
        return employeeForm;
    }

    // 
    /**
     * @description : Đặt giá trị cho form Update
     * @param updateForm : form Update cần set giá trị
     * @param employee : đối tượng đích
     */
    static bindingData(employeeForm: FormGroup, employee: Employee) {
        employeeForm.setValue({
            id: employee.id,
            code: employee.code,
            name: employee.name,
            user: {
                id: employee.user.id
            }
        });
    }
}