
import { User } from "../../adm-user/user/user";

/** 
 * 
*/
export class Employee {
    /** the id of the employee */
    id: number;
    /** the code of the employee */
    code: string;
    /** the name of the employee */
    name: string;
    /** the created of the data */
    created: Date;
    /** the creater of the data */
    creater: string;
    /** the modified name of the employee */
    modified: Date;
    /** the modifier of the employee */
    modifier: string;
    /** the employee of the employee */
    user: User;
    /** check mark*/
    checked: boolean;
}