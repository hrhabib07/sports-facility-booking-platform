import { Router } from "express";
import { BookingController } from "./booking.controller";

const router = Router();
router.post("/bookings", BookingController.createdBooking);
router.get("/check-availability", BookingController.getAllBooking);

export const BookingRoutes = router;