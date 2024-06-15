import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CarValidations } from "./car.validation";
import { CarControllers } from "./car.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post(
	"/",
	auth("admin"),
	validateRequest(CarValidations.createCarSchemaValidation),
	CarControllers.createCar
);

router.get("/", CarControllers.getAllCars);
router.get("/:id", CarControllers.getSignleCar);
router.put("/:id", auth("admin"), CarControllers.updateCar);
router.delete("/:id", auth("admin"), CarControllers.deleteACar);

export const CarRoutes = router;
