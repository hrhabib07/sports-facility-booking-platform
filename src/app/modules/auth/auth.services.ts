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
    };

    const jwtPayload = {
        email: existingUser.email,
        role: existingUser.role
    }
    // crate jwt token 
    const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: config.jwt_access_expires_in });
    const refreshToken = jwt.sign(jwtPayload, config.jwt_refresh_secret as string, { expiresIn: config.jwt_refresh_expires_in });

    return {
        accessToken,
        refreshToken
    }

};

export const AuthServices = {
    signInUserIntoDB,
    loginUserIntoDB
}