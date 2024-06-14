import { Router } from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";

const router = Router();
router.post("/signup", validateRequest(UserValidation.createUserValidationSchema), userController.createUser);

export const UserRoutes = router; 