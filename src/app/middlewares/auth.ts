import { JwtPayload } from "jsonwebtoken";
import { User_Role } from "../modules/users/userConstant";
import { catchAsync } from "../utils/catchAsync";
import httpStatus from "http-status";
import AppError from "../errors/appError";
import config from "../config";
import jwt from "jsonwebtoken";
import { User } from "../modules/users/user.model";

export const auth = (...requiredRoles: (keyof typeof User_Role)[]) => {
    return catchAsync(async (req, res, next) => {
        const tokenWithBearer = req.headers.authorization;
        const accessToken = tokenWithBearer?.split(" ")[1];
        if (!accessToken) {
            throw new AppError(httpStatus.BAD_REQUEST, "You are not authorized")
        }
        const decodedToken: JwtPayload = jwt.verify(accessToken as string, config.jwt_access_secret as string) as JwtPayload;
        const { role, email } = decodedToken;
        const user = await User.findOne({ email });

        if (!user) {
            throw new AppError(httpStatus.BAD_REQUEST, "User does not exist")
        }
        if (!requiredRoles.includes(role)) {
            throw new AppError(httpStatus.BAD_REQUEST, "You are not authorized")
        }

        next();

    })
};


