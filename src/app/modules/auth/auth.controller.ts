import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.services";
import config from "../../config";

const signInUser = catchAsync(async (req, res, next) => {
    const result = await AuthServices.signInUserIntoDB(req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Auth registered successfully",
        data: result
    })
});
const logInUser = catchAsync(async (req, res, next) => {
    const { accessToken, refreshToken } = await AuthServices.loginUserIntoDB(req.body);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: config.node_env === "production"
    });

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Auth registered successfully",
        data: {
            accessToken
        }
    })
});

export const authController = {
    signInUser,
    logInUser
}