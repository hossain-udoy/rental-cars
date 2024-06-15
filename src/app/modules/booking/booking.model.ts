import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>(
	{
		carId: {
			type: Schema.Types.ObjectId,
			ref: "car",
			unique: true,
			required: [true, "CarId is required!"],
		},
		date: {
			type: String,
			required: [true, "Date is required!"],
		},
		startTime: {
			type: String,
			required: [true, "Time is required!"],
		},
		endTime: {
			type: String,
			default: null,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		car: {
			type: Schema.Types.ObjectId,
			ref: "Car",
		},
		totalCost: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

bookingSchema.set("toJSON", {
	transform: function (doc, ret) {
		delete ret.carId;
		return ret;
	},
});

export const Booking = model<TBooking>("Booking", bookingSchema);
