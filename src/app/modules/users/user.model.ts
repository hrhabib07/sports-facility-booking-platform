import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import { User_Role } from "./userConstant";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  phone: { type: String, required: true },
  role: { type: String, enum: Object.keys(User_Role), required: true },
  address: { type: String, required: true },
  passwordChangedAd: { type: Date },
});

userSchema.pre("save", async function (next) {
  const hashedPassword = await bcrypt.hash(
    this.password,
    Number(config.salt_round),
  );
  this.password = hashedPassword;
  next();
});
userSchema.post("save", async function () {
  this.password = "";
});

export const User = model<TUser>("User", userSchema);
