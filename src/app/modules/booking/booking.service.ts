import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/appError";
import { bookingSearchableField } from "./booking.constant";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";

const crateBookingIntoDB = async (payload: TBooking) => {

    const result = await Booking.create(payload);
    return result;
};

const getAllBookingFromDB = async (date: string) => {
    // If date is not provided, use today's date in YYYY-MM-DD format
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().split('T')[0];

    const parsedDate = date || formattedCurrentDate;

    // Ensure the date is in YYYY-MM-DD format if provided
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (date && !datePattern.test(date)) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Invalid date format. Use YYYY-MM-DD.');
    };
    console.log(parsedDate);
    const result = await Booking.find({ date: parsedDate })
        .populate('user')
        .populate('facility');

    return result;
};

export const BookingServices = {
    crateBookingIntoDB,
    getAllBookingFromDB
}





// const getAllBooking = async (query: Record<string, unknown>) => {
//     const bookingQuery = new QueryBuilder(Booking.find().populate("user").populate("facility"), query).search(bookingSearchableField).filter().sort().paginate().fields();
//     const result = await bookingQuery.modelQuery;
//     return result;
// };

