import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserInToDb = async (userData: Partial<TUser>) => {
	const result = await User.create(userData);
	return result;
};

const getAllUsersInToDB = async () => {
	const result = await User.find()
	if (result.length === 0) {
		throw new AppError(httpStatus.NOT_FOUND,'No Users Found')
	}
	return result
}
const getSingleUserInToDB = async (id: string) => {
	const result = await User.findById(id)
	if (!result) {
		throw new AppError(httpStatus.NOT_FOUND,'No User found for thid id')
	}
	return result
}

export const UserServices = {
	createUserInToDb,getAllUsersInToDB,getSingleUserInToDB
};
