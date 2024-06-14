import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FacilityServices } from "./facility.service";

const crateFacility = catchAsync(async (req, res, next) => {
    const result = await FacilityServices.createFacilityIntoDB(req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Facility added successfully",
        data: result
    })
});

export const FacilityController = {
    crateFacility
} 