import { z } from "zod";

const createBookingValidationSchema = z.object({
  body: z.object({
    date: z.string({
      required_error: "Date is required",
    }),
    startTime: z
      .string({
        required_error: "Start time is required",
      })
      .regex(
        /^([0-1]\d|2[0-3]):([0-5]\d)$/,
        "Start time must be in the format HH:mm",
      ),
    endTime: z
      .string({
        required_error: "End time is required",
      })
      .regex(
        /^([0-1]\d|2[0-3]):([0-5]\d)$/,
        "End time must be in the format HH:mm",
      ),
    facility: z
      .string({
        required_error: "Facility ID is required",
      })
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid Facility ID format"),
  }),
});

export const BookingValidation = { createBookingValidationSchema };
