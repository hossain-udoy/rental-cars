import { Schema, model } from "mongoose";
import { TCar } from "./car.interface";

const carSchema = new Schema<TCar>(
	{
		name: {
			type: String,
			unique: true,
			required: [true, "Name is required!"],
		},
		description: {
			type: String,
			required: [true, "Description is required!"],
		},
		color: {
			type: String,
			required: [true, "Color is required!"],
		},
		isElectric: {
			type: Boolean,
			required: true,
		},
		features: {
			type: [String],
			required: [true, "Features is required!"],
		},
		pricePerHour: {
			type: Number,
			required: [true, "Price is required!"],
		},
		status: {
			type: String,
			enum: ["available", "unavailable"],
			default: "unavailable",
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

export const Car = model<TCar>("Car", carSchema);
