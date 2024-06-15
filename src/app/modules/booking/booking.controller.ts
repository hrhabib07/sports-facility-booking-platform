import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { User } from "../users/user.model";
import config from "../../config";
import { TUser } from "../users/user.interface";
import { getUserId } from "../../utils/getUserId";
import { Types } from "mongoose";

const createdBooking = catchAsync(async (req, res, next) => {

    const userId = await getUserId(req.headers.authorization as string);

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

const getAllBookings = catchAsync(async (req, res, next) => {
    const result = await BookingServices.getAllBookingsFromDB();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Bookings retrieved successfully",
        data: result
    })
});
const getUsersBookings = catchAsync(async (req, res, next) => {
    const userId = await getUserId(req.headers.authorization as string);
    const result = await BookingServices.getUserBookingsFromDB(userId as Types.ObjectId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Bookings retrieved successfully",
        data: result
    })
});
const deleteUsersBooking = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const result = await BookingServices.deleteUserBookingsFromDB(id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Bookings retrieved successfully",
        data: result
    })
});


export const BookingController = {
    createdBooking,
    getAvailableSlots,
    getAllBookings,
    getUsersBookings,
    deleteUsersBooking
}