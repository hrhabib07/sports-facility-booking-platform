import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { User } from "../users/user.model";
import { TUserLogin, TUserSignIn } from "./auth.interface";
import jwt from "jsonwebtoken";
import { isPasswordMatch } from "./auth.utils";
import config from "../../config";

const signInUserIntoDB = async (payload: TUserSignIn) => {
    // check if user Exist 
    const doesUserExist = await User.findOne({ email: payload.email });
    if (doesUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "user already exist with this email")
    };

    const result = await User.create(payload);
    return result;
};

const loginUserIntoDB = async (payload: TUserLogin) => {
    const existingUser = await User.findOne({ email: payload.email }).select("+password");
    if (!existingUser) {
        throw new AppError(httpStatus.BAD_REQUEST, "user does not exist with this email")
    };

    const isMatched = await isPasswordMatch(payload.password, existingUser.password);
    if (!isMatched) {
        throw new AppError(httpStatus.BAD_REQUEST, "invalid password")
    }
    // crate jwt token 
    jwt.sign({
        data: payload,
    }, config.jwt_secret as string, { expiresIn: "10d" });
};

export const AuthServices = {
    signInUserIntoDB,
    loginUserIntoDB
}