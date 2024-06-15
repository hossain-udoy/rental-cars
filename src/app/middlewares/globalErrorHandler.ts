/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { TErrorSources } from "../interface.ts/error";
import { ZodError } from "zod";
import handleZodErrror from "../errors/handleZodError";
import config from "../config";
import AppError from "../errors/AppError";
import handleDuplicateError from "../errors/handleDuplicateError";
import handleCastError from "../errors/handleCastError";
import handleValidationError from "../errors/handleValidationError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
	let statusCode = 5000;
	let message = "Something went wrong!";

	let errorMessages: TErrorSources = [
		{
			path: "",
			message: "Something went wrong!",
		},
	];

	if (err instanceof ZodError) {
		const simplifiedError = handleZodErrror(err);
		statusCode = simplifiedError?.statusCode;
		message = simplifiedError?.message;
		errorMessages= simplifiedError?.errorSources;
	} else if (err?.name === "ValidationError") {
		const simplifiedError = handleValidationError(err);
		statusCode = simplifiedError?.statusCode;
		message = simplifiedError?.message;
		errorMessages= simplifiedError?.errorSources;
	} else if (err?.name === "CastError") {
		const simplifiedError = handleCastError(err);
		statusCode = simplifiedError?.statusCode;
		message = simplifiedError?.message;
		errorMessages= simplifiedError?.errorSources;
	} else if (err?.code === 11000) {
		const simplifiedError = handleDuplicateError(err);
		statusCode = simplifiedError?.statusCode;
		message = simplifiedError?.message;
		errorMessages= simplifiedError?.errorSources;
	} else if (err instanceof AppError) {
		statusCode = err?.statusCode;
		message = err?.message;
		errorMessages= [
			{
				path: "",
				message: err?.message,
			},
		];
	} else if (err instanceof Error) {
		message = err.message;
		errorMessages= [
			{
				path: "",
				message: err?.message,
			},
		];
	}

	return res.status(statusCode).json({
		success: false,
		message,
		errorMessages,
		err,
		stack: config.NODE_ENV === "development" ? err?.stack : null,
	});
};

export default globalErrorHandler;
