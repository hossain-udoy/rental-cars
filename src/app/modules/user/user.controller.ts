import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createUser = catchAsync(async (req, res) => {
	const result = await UserServices.createUserInToDb(req.body);
	sendResponse(res, {
		success: true,
		statusCode: 201,
		message: "User registered successfully",
		data: result,
	});
});

const getAllUsers = catchAsync(async (req, res) => {
	const result = await UserServices.getAllUsersInToDB();
	sendResponse(res, {
		success: true,
		statusCode: 201,
		message: "Users fatched successfully",
		data: result,
	});
});

const getSingleUser = catchAsync(async (req, res) => {
	const result = await UserServices.getSingleUserInToDB(req.params.id);
	sendResponse(res, {
		success: true,
		statusCode: 201,
		message: "User fatched successfully",
		data: result,
	});
});
export const UserControllers = {
	createUser,
	getAllUsers,
	getSingleUser,
};
