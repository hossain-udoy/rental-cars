import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface.ts/error";

const handleValidationError = (
	err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
	const errorSources: TErrorSources = Object.values(err.errors).map(
		(value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
			return {
				path: value?.path,
				message: value?.message,
			};
		}
	);

	return {
		statusCode: 400,
		message: "ValidationError",
		errorSources,
	};
};

export default handleValidationError;
