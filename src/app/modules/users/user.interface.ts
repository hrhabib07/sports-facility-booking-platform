import { User_Role } from "./userConstant";

export type TUser = {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: keyof typeof User_Role;
    address: string;
    passwordChangedAd?: Date;
}