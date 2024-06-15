import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { loginValidations } from "./auth.validation";

const router = Router();

router.post(
	"/signin",
	validateRequest(loginValidations.loginValidationSchema),
	AuthControllers.loginUser
);

export const AuthRoutes = router;
