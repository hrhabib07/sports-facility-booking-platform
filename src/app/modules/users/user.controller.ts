// import httpStatus from "http-status";
// import { catchAsync } from "../../utils/catchAsync";
// import sendResponse from "../../utils/sendResponse";
// import { UserServices } from "./user.service";

// const createUser = catchAsync(async (req, res, next()) => {
//   const result = await UserServices.createUserIntoDB(req.body);
//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: "User registered successfully",
//     data: result,
//   });
// });

// export const userController = {
//   createUser,
// };
