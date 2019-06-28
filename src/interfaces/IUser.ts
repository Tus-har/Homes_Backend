import {Role, Sex} from "../enums/UserEnums";

export interface IUser {
    id?: number ;
    name: string ;
    password: string ;
    phoneNumber: string ;
    role: Role ;
    sex: Sex;
    email: string;
}
