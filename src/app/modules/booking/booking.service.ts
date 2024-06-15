import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Car } from "../car/car.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { User } from "../user/user.model";

const createBookingInToDB = async (
	payload: Partial<TBooking>,
	userData: Record<string, unknown>
) => {
	// check if already exists booked the car
	const isExistsBookedCar = await Booking.findOne({ car: payload?.carId });
	if (isExistsBookedCar) {
		throw new AppError(httpStatus.BAD_REQUEST, "Already booked the car!");
	}
	// check user
	const user = await User.findOne({ email: userData?.userEmail });
	if (!user) {
		throw new AppError(httpStatus.NOT_FOUND, "User not found!");
	}
	// check car
	const car = await Car.findById(payload?.carId);
	if (!car) {
		throw new AppError(httpStatus.NOT_FOUND, "Car not found!");
	}

	// create new car
	const newBooking = new Booking({
		carId: payload?.carId,
		date: payload?.date,
		startTime: payload?.startTime,
		endTime: null,
		user,
		car,
		totalCost: 0,
	});

	const result = await Booking.create(newBooking);
	return result;
};

// get all bookings admin
const getAllBookingInToDB = async (query: Record<string, unknown>) => {
	const result = await Booking.find(query).populate("user").populate("car");
	if (result.length === 0) {
		throw new AppError(httpStatus.NOT_FOUND,'No Data Found')
	}
	return result;
};

// get user booking
const getMyBookingInToDB = async (email: string) => {
	const user = await User.findOne({ email });
	const result = await Booking.find({ user: user?._id })
		.populate("user")
		.populate("car");

	return result;
};

// booking confirm by admin
const updateBookingForConfirmInToDB = async (
	payload: Record<string, string>
) => {
	const { bookingId, endTime } = payload;
	// check if the booked is exists
	const booking = await Booking.findById(bookingId)
		.populate("user")
		.populate("car");
	const car = await Car.findByIdAndUpdate(booking?.car, {
		status: "availabe",
	});
	if (!booking) {
		throw new AppError(httpStatus.NOT_FOUND, "Booking not found!");
	}

	const startTime = parseInt(booking.startTime.split(":")[0], 10);
	const endTimeInt = parseInt(endTime.split(":")[0], 10);
	const duration = endTimeInt - startTime;
	const totalCost = duration * (car?.pricePerHour as number);

	// update booking
	booking.endTime = endTime;
	booking.totalCost = totalCost;
	await booking.save();
	return booking;
};
export const BookingServices = {
	createBookingInToDB,
	getAllBookingInToDB,
	getMyBookingInToDB,
	updateBookingForConfirmInToDB,
};
