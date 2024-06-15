import { JwtPayload } from "jsonwebtoken";
import { User_Role } from "../modules/users/userConstant";
import { catchAsync } from "../utils/catchAsync";
import httpStatus from "http-status";
import AppError from "../errors/appError";
import config from "../config";
import jwt from "jsonwebtoken";
import { User } from "../modules/users/user.model";
import { TUser } from "../modules/users/user.interface";
import { Types } from "mongoose";
// Extend the Request interface to include the verifiedUser
interface AuthenticatedRequest extends Request {
    verifiedUser?: {
        _id: Types.ObjectId;
        role: keyof typeof User_Role;
        email: string;
    };
}
export const auth = (...requiredRoles: (keyof typeof User_Role)[]) => {
    return catchAsync(async (req, res, next) => {
        const tokenWithBearer = req.headers.authorization;
        const accessToken = tokenWithBearer?.split(" ")[1];
        if (!accessToken) {
            throw new AppError(httpStatus.BAD_REQUEST, "Authorization token not provided")
        }
        const decodedToken: JwtPayload = jwt.verify(accessToken as string, config.jwt_access_secret as string) as JwtPayload;
        const { role, email } = decodedToken;
        const verifiedUser = await User.findOne({ email });

        if (!verifiedUser) {
            throw new AppError(httpStatus.BAD_REQUEST, "User does not found")
        }
        if (!requiredRoles.includes(role)) {
            throw new AppError(httpStatus.BAD_REQUEST, "You have no access to this route")
        }

        next();

    })
};


