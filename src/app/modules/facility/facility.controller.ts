import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FacilityServices } from "./facility.service";

const crateFacility = catchAsync(async (req, res) => {
  const result = await FacilityServices.createFacilityIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Facility added successfully",
    data: result,
  });
});
const updateFacility = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacilityServices.updateFacilityFromDB(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Facility updated successfully",
    data: result,
  });
});
const deleteFacility = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacilityServices.deleteFacilityFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Facility deleted successfully",
    data: result,
  });
});
const getAllFacility = catchAsync(async (req, res) => {
  const result = await FacilityServices.getAllFacilityFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Facilities retrieved successfully",
    data: result,
  });
});
const getSingleFacility = catchAsync(async (req, res) => {
  const { id } = req.params;
  // const result = await FacilityServices.deleteFacilityFromDB(id);
  const result = await FacilityServices.getSingleFacilityFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Facility has been retrieved successfully",
    data: result,
  });
});

export const FacilityController = {
  crateFacility,
  updateFacility,
  deleteFacility,
  getAllFacility,
  getSingleFacility,
};
