import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";
import { getUserId } from "../../utils/getUserId";
import { Types } from "mongoose";

const createdBooking = catchAsync(async (req, res) => {
  const userId = await getUserId(req.headers.authorization as string);

  const result = await BookingServices.crateBookingIntoDB(req.body, userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking created successfully",
    data: result,
  });
});

const getAvailableSlots = catchAsync(async (req, res) => {
  const date = req.query.date as string;
  const facility = req.query.facility as string;

  const result = await BookingServices.getAvailableSlotsFromDB(date, facility);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Availability checked successfully",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bookings retrieved successfully",
    data: result,
  });
});
const getSingleBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.getSingleBookingFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking has retrieved successfully",
    data: result,
  });
});
const deleteSingleBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.deleteSingleBookingFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking has been deleted successfully",
    data: result,
  });
});
const getUsersBookings = catchAsync(async (req, res) => {
  const userId = await getUserId(req.headers.authorization as string);
  const result = await BookingServices.getUserBookingsFromDB(
    userId as Types.ObjectId
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bookings retrieved successfully",
    data: result,
  });
});
const deleteUsersBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = await getUserId(req.headers.authorization as string);

  const result = await BookingServices.deleteUserBookingsFromDB(
    id,
    userId as Types.ObjectId
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

export const BookingController = {
  createdBooking,
  getAvailableSlots,
  getAllBookings,
  getUsersBookings,
  getSingleBooking,
  deleteSingleBooking,
  deleteUsersBooking,
};
