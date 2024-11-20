import { Types } from "mongoose";

export type TIsBooked = "confirmed" | "unconfirmed" | "canceled";
export type TBooking = {
  date: string;
  startTime: string;
  endTime: string;
  user?: Types.ObjectId;
  facility: Types.ObjectId;
  payableAmount?: number;
  isBooked: TIsBooked;
};
