import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import { object } from "zod";
import { User_Role } from "./userConstant";

const userSchema = new Schema<TUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: Object.keys(User_Role), required: true },
    address: { type: String, required: true },
    passwordChangedAd: { type: Date }
});

export const User = model<TUser>("User", userSchema); 