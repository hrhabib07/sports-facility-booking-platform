import { Router } from "express";
import { BookingController } from "./booking.controller";
import { auth } from "../../middlewares/auth";
import { User_Role } from "../users/userConstant";
import validateRequest from "../../middlewares/validateRequest";
import { BookingValidation } from "./booking.validation";

const router = Router();
router.post(
  "/bookings",
  auth(User_Role.user),
  validateRequest(BookingValidation.createBookingValidationSchema),
  BookingController.createdBooking
);
router.get(
  "/bookings",
  auth(User_Role.admin),
  BookingController.getAllBookings
);
router.delete(
  "/bookings/:id",
  auth(User_Role.user),
  BookingController.deleteUsersBooking
);
router.delete(
  "/bookings/admin/:id",
  auth(User_Role.admin),
  BookingController.deleteSingleBooking
);
router.get(
  "/bookings/user",
  auth(User_Role.user),
  BookingController.getUsersBookings
);
router.get(
  "/bookings/:id",
  auth(User_Role.admin),
  BookingController.getSingleBooking
);
router.get("/check-availability", BookingController.getAvailableSlots);

export const BookingRoutes = router;
