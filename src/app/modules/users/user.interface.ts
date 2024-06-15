import { Types } from "mongoose";
import { User_Role } from "./userConstant";

export type TUser = {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: keyof typeof User_Role;
  address: string;
  passwordChangedAd?: Date;
};
