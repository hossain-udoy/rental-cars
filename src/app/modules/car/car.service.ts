import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TCar } from "./car.interface";
import { Car } from "./car.model";

// create car in to db /
const createCarInToDB = async (payload: Partial<TCar>) => {
	const result = await Car.create(payload);
	return result;
};
// get all cars in to db
const getAllCarsInToDB = async () => {
	const result = await Car.find();
	if (result.length === 0) {
		throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
	}
	return result;
};
// get single car in to db
const getSingleCarInToDB = async (id: string) => {
	const result = await Car.findById(id);
	if (!result) {
		throw new AppError(httpStatus.NOT_FOUND, `No data Found for this id`);
	}
	return result;
};

// update car
const updateCarInToDB = async (id: string, payload: Partial<TCar>) => {
	const result = await Car.findByIdAndUpdate(id, payload, {
		new: true,
		runValidators: true,
	});
 
	if (!result) {
		throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
	}
	return result;
};
// deleted a car
const deleteACarInToDB = async (id: string) => {
	const result = await Car.findOneAndUpdate({
		_id: id,
		isDeleted: true,
	});

	return result;
};
export const CarServices = {
	createCarInToDB,
	getAllCarsInToDB,
	getSingleCarInToDB,
	updateCarInToDB,
	deleteACarInToDB,
};
