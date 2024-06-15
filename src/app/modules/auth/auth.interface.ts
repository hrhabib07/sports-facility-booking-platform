import { User_Role } from "../users/userConstant";

export type TUserSignIn = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: keyof typeof User_Role;
  address: string;
  passwordChangedAd?: Date;
};

export type TUserLogin = {
  email: string;
  password: string;
};
