import z from "zod";

const createBookingValidation = z.object({
	body: z.object({
		carId: z.string(),
		date: z.string(),
		startTime: z.string(),
	}),
});

export const BookingValidations = {
	createBookingValidation,
};
