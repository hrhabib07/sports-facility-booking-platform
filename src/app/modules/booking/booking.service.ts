import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { isBooked } from "./booking.constant";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken"
import { ObjectId, Types } from "mongoose";

const crateBookingIntoDB = async (payload: TBooking, userId: Types.ObjectId | undefined) => {
    const { startTime, endTime } = payload;
    const difference: number = Number(endTime.split(':')[0]) - Number(startTime.split(':')[0]);

    payload.payableAmount = difference * 20;
    payload.isBooked = isBooked.confirmed;
    payload.user = userId;

    const result = await Booking.create(payload);
    return result;
};

const getAvailableSlotsFromDB = async (date: string) => {
    // If date is not provided, use today's date in YYYY-MM-DD format
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().split('T')[0];

    const parsedDate = date || formattedCurrentDate;

    // Ensure the date is in YYYY-MM-DD format if provided
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (date && !datePattern.test(date)) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Invalid date format. Use YYYY-MM-DD.');
    };

    const result = await Booking.find({ date: parsedDate, isBooked: isBooked.unconfirmed }).select("startTime endTime -_id");

    return result;
};

export const BookingServices = {
    crateBookingIntoDB,
    getAvailableSlotsFromDB
}
