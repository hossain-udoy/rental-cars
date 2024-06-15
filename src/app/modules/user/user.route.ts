import { Router } from "express";
import { UserControllers } from "./user.controller";
import { UserValidatios } from "./user.validation";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";

const router = Router();

router.post(
	"/signup",
	validateRequest(UserValidatios.createUserValidation),
	UserControllers.createUser
);

router.get("/users", auth("admin"), UserControllers.getAllUsers);
router.get("/user/:id", auth("admin"), UserControllers.getSingleUser);

export const UserRoutes = router;
