import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { User } from "../users/user.model";
import config from "../../config";
import { TUser } from "../users/user.interface";

const createdBooking = catchAsync(async (req, res, next) => {

    const tokenWithBearer = req.headers.authorization;
    const accessToken = tokenWithBearer?.split(" ")[1];
    const decodedToken: JwtPayload = jwt.verify(accessToken as string, config.jwt_access_secret as string) as JwtPayload;
    const { role, email } = decodedToken;
    const verifiedUser: TUser | null = await User.findOne({ email });

    const userId = verifiedUser?._id;

    const result = await BookingServices.crateBookingIntoDB(req.body, userId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Booking created successfully",
        data: result
    })
});

const getAvailableSlots = catchAsync(async (req, res, next) => {
    const date = req.query.date as string;
    const result = await BookingServices.getAvailableSlotsFromDB(date);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Availability checked successfully",
        data: result
    })
});


export const BookingController = {
    createdBooking,
    getAvailableSlots
}