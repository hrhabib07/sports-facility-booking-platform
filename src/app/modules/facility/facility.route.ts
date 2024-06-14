import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { FacilityValidations } from "./facility.validation";
import { FacilityController } from "./facility.controller";
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../../config";
import AppError from "../../errors/appError";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { auth } from "../../middlewares/auth";
import { User_Role } from "../users/userConstant";

const router = Router();
router.post("/", validateRequest(FacilityValidations.createFacilityValidationSchema), auth(User_Role.admin), FacilityController.crateFacility);

export const FacilityRoutes = router;