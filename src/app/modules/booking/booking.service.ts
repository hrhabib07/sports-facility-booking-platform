import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { isBooked } from "./booking.constant";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { Types } from "mongoose";

const crateBookingIntoDB = async (
  payload: TBooking,
  userId: Types.ObjectId | undefined,
) => {
  const isBookingExist = await Booking.findOne({
    date: payload.date,
    startTime: payload.startTime,
    endTime: payload.endTime,
    isBooked: isBooked.confirmed,
  });
  if (isBookingExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "This time slot is booked");
  }
  const { startTime, endTime } = payload;
  const difference: number =
    Number(endTime.split(":")[0]) - Number(startTime.split(":")[0]);
  payload.isBooked ? payload.isBooked : (payload.isBooked = isBooked.confirmed);
  payload.payableAmount = difference * 20;
  payload.user = userId;

  const result = await Booking.create(payload);
  return result;
};

const getAvailableSlotsFromDB = async (date: string) => {
  // If date is not provided, use today's date in YYYY-MM-DD format
  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toISOString().split("T")[0];

  const parsedDate = date || formattedCurrentDate;

  // Ensure the date is in YYYY-MM-DD format if provided
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (date && !datePattern.test(date)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Invalid date format. Use YYYY-MM-DD.",
    );
  }

  const result = await Booking.find({
    date: parsedDate,
    isBooked: isBooked.unconfirmed,
  }).select("startTime endTime -_id");

  return result;
};

const getAllBookingsFromDB = async () => {
  const result = await Booking.find().populate("user").populate("facility");
  return result;
};

const getUserBookingsFromDB = async (id: Types.ObjectId) => {

  const result = await Booking.find({ user: id })
    .populate("user")
    .populate("facility");

  // // Filter out bookings where isBooked is 'canceled'
  // const activeBookings = result.filter(booking => booking.isBooked !== 'canceled');

  return result;
};

const deleteUserBookingsFromDB = async (
  bookingId: string,
  userId: Types.ObjectId,
) => {
  // Fetch bookings by userId
  const userBookings = await Booking.find({ user: userId }).select("_id user");
  // console.log(userBookings);

  // Check if bookingId exists in userBookings
  const bookingExists = userBookings.some((booking) =>
    booking._id.equals(bookingId),
  );

  if (!bookingExists) {
    throw new Error("Booking not found or does not belong to the user");
  }
  const result = await Booking.findOneAndUpdate(
    { _id: bookingId },
    { isBooked: isBooked.canceled },
    { new: true },
  );
  return result;
};

export const BookingServices = {
  crateBookingIntoDB,
  getAvailableSlotsFromDB,
  getAllBookingsFromDB,
  getUserBookingsFromDB,
  deleteUserBookingsFromDB,
};
