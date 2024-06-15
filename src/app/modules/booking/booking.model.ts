import { Schema, model } from "mongoose";
import { TBooking, TIsBooked } from "./booking.interface";

const bookingSchema = new Schema<TBooking>({
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    facility: { type: Schema.Types.ObjectId, ref: 'Facility', required: true },
    payableAmount: { type: Number, required: true },
    isBooked: { type: String, enum: ['confirmed', 'unconfirmed', 'canceled'], required: true },
});

export const Booking = model<TBooking>("Booking", bookingSchema);
