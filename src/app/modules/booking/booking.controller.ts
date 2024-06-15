import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
	const user = req?.user;
	const result = await BookingServices.createBookingInToDB(req.body, user);

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: "Car booked successfully",
		data: result,
	});
});

const getAllBooking = catchAsync(async (req, res) => {
	const result = await BookingServices.getAllBookingInToDB(req.query);

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: "Bookings retrieved successfully",
		data: result,
	});
});

// get user booking
const getMybooking = catchAsync(async (req, res) => {
	const { userEmail } = req.user;
	const result = await BookingServices.getMyBookingInToDB(userEmail);
	if (result.length === 0) {
		sendResponse(res, {
			success: false,
			statusCode: httpStatus.NOT_FOUND,
			message: "No Data Found",
			data: result,
		});
	}
	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: "My Bookings retrieved successfully",
		data: result,
	});
});

const updateBookingForConfirmByAdmin = catchAsync(async (req, res) => {
	const result = await BookingServices.updateBookingForConfirmInToDB(req.body )
	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: "Car booked successfully",
		data: result,
	});
})
export const BookingControllers = {
	createBooking,
	getAllBooking,
	getMybooking,updateBookingForConfirmByAdmin
};
