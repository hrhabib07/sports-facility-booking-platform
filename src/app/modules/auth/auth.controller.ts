import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.services";
import config from "../../config";

const signInUser = catchAsync(async (req, res) => {
  const result = await AuthServices.signInUserIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User registered successfully",
    data: result,
  });
});
const logInUser = catchAsync(async (req, res) => {
  const { accessToken, refreshToken, result } =
    await AuthServices.loginUserIntoDB(req.body);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.node_env === "production",
  });

  res.json({
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    token: accessToken,
    data: result,
  });
});

export const authController = {
  signInUser,
  logInUser,
};
