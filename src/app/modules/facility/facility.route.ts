import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { FacilityValidations } from "./facility.validation";
import { FacilityController } from "./facility.controller";
import { auth } from "../../middlewares/auth";
import { User_Role } from "../users/userConstant";

const router = Router();
router.post(
  "/",
  validateRequest(FacilityValidations.createFacilityValidationSchema),
  auth(User_Role.admin),
  FacilityController.crateFacility
);
router.put(
  "/:id",
  validateRequest(FacilityValidations.updateFacilityValidationSchema),
  auth(User_Role.admin),
  FacilityController.updateFacility
);
router.delete("/:id", auth(User_Role.admin), FacilityController.deleteFacility);
router.get("/", FacilityController.getAllFacility);
router.get("/:id", FacilityController.getSingleFacility);

export const FacilityRoutes = router;
