import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CarServices } from "./car.service";

// create car
const createCar = catchAsync(async (req, res) => {
	const result = await CarServices.createCarInToDB(req.body);

	sendResponse(res, {
		success: true,
		statusCode: 201,
		message: "Car created successfully",
		data: result,
	});
});

// get all cars
const getAllCars = catchAsync(async (req, res) => {
	const result = await CarServices.getAllCarsInToDB();
	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: "Cars retrived successfully",
		data: result,
	});
});
// get single car
const getSignleCar = catchAsync(async (req, res) => {
	const { id } = req.params;
	const result = await CarServices.getSingleCarInToDB(id);
	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: "A Car retrived successfully",
		data: result,
	});
});

// update car
const updateCar = catchAsync(async (req, res) => {
	const { id } = req.params;
	const carUpdatedData = req.body;
	const result = await CarServices.updateCarInToDB(id, carUpdatedData);
	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: "A Car retrived successfully",
		data: result,
	});
});

// delete a car
const deleteACar = catchAsync(async (req, res) => {
	const { id } = req.params;
	const result = await CarServices.deleteACarInToDB(id);
	 
	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: "Car Deleted successfully",
		data: result,
	});
});
export const CarControllers = {
	createCar,
	getAllCars,
	getSignleCar,
	updateCar,deleteACar
};
