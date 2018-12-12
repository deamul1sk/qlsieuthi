import { Role } from "../role/role";

/** 
 * 
*/
export class User {
    /** the id of the user */
    id: number;
    /** the code of the user */
    code: string;
    /** the username of the user */
    username: string;
    /** the password of the user */
    password: string;
    /** the created of the data */
    created: Date;
    /** the creater of the data */
    creater: string;
    /** the english name of the user */
    modified: Date;
    /** the modifier of the user */
    modifier: string;
    /** the role of the user */
    role: Role;
    /** check mark*/
    checked: boolean;
}