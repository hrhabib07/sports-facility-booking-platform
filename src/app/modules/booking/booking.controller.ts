import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";

const createdBooking = catchAsync(async (req, res, next) => {
    const result = await BookingServices.crateBookingIntoDB(req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Booking created successfully",
        data: result
    })
});

const getAllBooking = catchAsync(async (req, res, next) => {
    const date = req.query.date as string;
    const result = await BookingServices.getAllBookingFromDB(date);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Availability checked successfully",
        data: result
    })
});


export const BookingController = {
    createdBooking,
    getAllBooking
}