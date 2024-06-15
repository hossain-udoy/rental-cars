import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BookingValidations } from "./booking.validation";
import { BookingControllers } from "./booking.controller";
import auth from "../../middlewares/auth";

const router = Router();
router.post(
	"/",
	auth("user"),
	validateRequest(BookingValidations.createBookingValidation),
	BookingControllers.createBooking
);
router.get("/", auth("admin"), BookingControllers.getAllBooking);
router.get("/my-bookings", auth("user"), BookingControllers.getMybooking);
router.put(
	"/return",
	auth("admin"),
	BookingControllers.updateBookingForConfirmByAdmin
);

export const BookingRoutes = router;
