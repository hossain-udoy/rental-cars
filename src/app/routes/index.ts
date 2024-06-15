import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { CarRoutes } from "../modules/car/car.route";
import { BookingRoutes } from "../modules/booking/booking.route";

const router = Router();
const modulesRoutes = [
	{ path: "/auth", route: UserRoutes },
	{ path: "/auth", route: AuthRoutes },
	{ path: "/cars", route: CarRoutes },
	{ path: "/bookings", route: BookingRoutes },
];
modulesRoutes.forEach(route => router.use(route.path, route.route));
export default router;
