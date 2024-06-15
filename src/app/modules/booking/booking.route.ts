import { Router } from "express";
import { BookingController } from "./booking.controller";
import { auth } from "../../middlewares/auth";
import { User_Role } from "../users/userConstant";

const router = Router();
router.post("/bookings", auth(User_Role.user), BookingController.createdBooking);
router.get("/bookings", auth(User_Role.admin), BookingController.getAllBookings);
router.get("/bookings/user", auth(User_Role.user), BookingController.getUsersBookings);
router.get("/check-availability", BookingController.getAvailableSlots);

export const BookingRoutes = router;