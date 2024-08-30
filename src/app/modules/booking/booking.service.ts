import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { isBooked } from "./booking.constant";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { Types } from "mongoose";
import { initiatePayment } from "../payment/payment.utils";
import { User } from "../users/user.model";

const crateBookingIntoDB = async (
  payload: TBooking,
  userId: Types.ObjectId | undefined
) => {
  // if there is a past date selected then return error
  const selectedDate = payload.date;

  // If date is not provided, use today's date in YYYY-MM-DD format
  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toISOString().split("T")[0];
  // Convert parsedDate and currentDate to Date objects for comparison
  const bookingDate = new Date(selectedDate);
  const todayDate = new Date(formattedCurrentDate);

  // Compare the provided date with today's date
  if (bookingDate < todayDate) {
    throw new AppError(httpStatus.BAD_REQUEST, "You cannot book a past date.");
  }

  const isBookingExist = await Booking.findOne({
    date: payload.date,
    startTime: payload.startTime,
    endTime: payload.endTime,
    isBooked: isBooked.confirmed,
  });

  if (isBookingExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This time slot is booked, Try for a different time"
    );
  }

  const { startTime, endTime } = payload;
  const difference: number =
    Number(endTime.split(":")[0]) - Number(startTime.split(":")[0]);
  if (difference > 1) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You can't book more than 1 hours in a single booking"
    );
  }
  payload.isBooked ? payload.isBooked : (payload.isBooked = isBooked.confirmed);
  payload.payableAmount = difference * 500;
  payload.user = userId;
  const user = await User.findById(payload.user);

  const transactionId = `TRX-${Date.now()}`;
  // console.log(transactionId);
  const paymentData = {
    transactionId: transactionId,
    totalPrice: payload.payableAmount,
    customerPhone: user?.phone,
    customerName: user?.name,
    customerEmail: user?.email,
    customerAddress: user?.address,
  };

  // const result = await Booking.create(payload);
  const paymentSession = await initiatePayment(paymentData);
  // console.log(paymentSession);
  return paymentSession;
};

const getAvailableSlotsFromDB = async (date: string, facility: string) => {
  // If date is not provided, use today's date in YYYY-MM-DD format
  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toISOString().split("T")[0];

  const parsedDate = date || formattedCurrentDate;

  // Ensure the date is in YYYY-MM-DD format if provided
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (date && !datePattern.test(date)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Invalid date format. Use YYYY-MM-DD."
    );
  }

  // Convert parsedDate and currentDate to Date objects for comparison
  const bookingDate = new Date(parsedDate);
  const todayDate = new Date(formattedCurrentDate);

  // Compare the provided date with today's date
  if (bookingDate < todayDate) {
    throw new AppError(httpStatus.BAD_REQUEST, "You cannot book a past date.");
  }

  // Define all possible slots for the day with breaks from 02:00 - 06:00
  const allSlots = [
    { startTime: "00:00", endTime: "01:00" },
    { startTime: "01:00", endTime: "02:00" },
    // Break from 02:00 to 06:00
    { startTime: "06:00", endTime: "07:00" },
    { startTime: "07:00", endTime: "08:00" },
    { startTime: "08:00", endTime: "09:00" },
    { startTime: "09:00", endTime: "10:00" },
    { startTime: "10:00", endTime: "11:00" },
    { startTime: "11:00", endTime: "12:00" },
    { startTime: "12:00", endTime: "13:00" },
    { startTime: "13:00", endTime: "14:00" },
    { startTime: "14:00", endTime: "15:00" },
    { startTime: "15:00", endTime: "16:00" },
    { startTime: "16:00", endTime: "17:00" },
    { startTime: "17:00", endTime: "18:00" },
    { startTime: "18:00", endTime: "19:00" },
    { startTime: "19:00", endTime: "20:00" },
    { startTime: "20:00", endTime: "21:00" },
    { startTime: "21:00", endTime: "22:00" },
    { startTime: "22:00", endTime: "23:00" },
    { startTime: "23:00", endTime: "24:00" },
  ];

  // Get all bookings (confirmed and unconfirmed) for the date
  const bookings = await Booking.find({
    date: parsedDate,
    facility,
  }).select("startTime endTime isBooked -_id facility");
  // console.log("bookings", bookings);

  // Filter out slots that are confirmed
  const availableSlots = allSlots.filter((slot) => {
    return !bookings.some(
      (booking) =>
        booking.isBooked === "confirmed" &&
        booking.startTime === slot.startTime &&
        booking.endTime === slot.endTime
    );
  });
  // console.log("availableSlots", availableSlots);

  // If there are no unconfirmed bookings, return all remaining available slots
  if (!bookings.some((booking) => booking.isBooked === "unconfirmed")) {
    return availableSlots;
  }

  // Filter out slots that are unconfirmed as well
  const finalSlots = availableSlots.filter((slot) => {
    return !bookings.some(
      (booking) =>
        booking.isBooked === "unconfirmed" &&
        booking.startTime === slot.startTime &&
        booking.endTime === slot.endTime
    );
  });

  return finalSlots;
};

const getAllBookingsFromDB = async () => {
  const result = await Booking.find().populate("user").populate("facility");
  return result;
};
const getSingleBookingFromDB = async (id: string) => {
  const result = await Booking.findById(id)
    .populate("user")
    .populate("facility");
  return result;
};
const deleteSingleBookingFromDB = async (id: string) => {
  const result = await Booking.findOneAndUpdate(
    { _id: id },
    { isBooked: isBooked.canceled },
    { new: true }
  );
  // const result = await Booking.findByIdAndDelete(id)
  //   .populate("user")
  //   .populate("facility");
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
  userId: Types.ObjectId
) => {
  // Fetch bookings by userId
  const userBookings = await Booking.find({ user: userId }).select("_id user");
  // console.log(userBookings);

  // Check if bookingId exists in userBookings
  const bookingExists = userBookings.some((booking) =>
    booking._id.equals(bookingId)
  );

  if (!bookingExists) {
    throw new Error("Booking not found or does not belong to the user");
  }
  const result = await Booking.findOneAndUpdate(
    { _id: bookingId },
    { isBooked: isBooked.canceled },
    { new: true }
  );
  return result;
};

export const BookingServices = {
  crateBookingIntoDB,
  getAvailableSlotsFromDB,
  getAllBookingsFromDB,
  getUserBookingsFromDB,
  getSingleBookingFromDB,
  deleteSingleBookingFromDB,
  deleteUserBookingsFromDB,
};
