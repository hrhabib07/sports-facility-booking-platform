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
const updateFacility = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const result = await FacilityServices.updateFacilityFromDB(id, req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Facility updated successfully",
        data: result
    })
});
const deleteFacility = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const result = await FacilityServices.deleteFacilityFromDB(id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Facility deleted successfully",
        data: result
    })
});

export const FacilityController = {
    crateFacility,
    updateFacility,
    deleteFacility
} 