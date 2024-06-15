import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";
import config from "../../config";

const loginUser = async (payload: TLoginUser) => {
	// checking if the user is exists
	const user = await User.isUserExistsByEmail(payload?.email);

	if (!user) {
		throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
	}

	// checking if the password is matched
	if (!(await User.isPasswordMatched(payload?.password, user?.password)))
		throw new AppError(httpStatus.FORBIDDEN, "Password do not matched!");

	// create token and send to the client side
	const jwtPayload = {
		userEmail: user?.email,
		role: user?.role,
	};
	const accessToken = createToken(
		jwtPayload,
		config.jwt_access_secret as string,
		config.jwt_access_expires_in as string
	);
	 
	return { user, accessToken };
};

export const AuthServices = {
	loginUser,
};
