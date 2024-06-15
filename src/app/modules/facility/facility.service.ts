import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";

const createFacilityIntoDB = async (payload: TFacility) => {
    const result = await Facility.create(payload);
    return result;
};
const updateFacilityFromDB = async (id: string, payload: Partial<TFacility>) => {
    const deletedFacility = await Facility.findById(id);
    if (deletedFacility?.isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, "facility already deleted");
    };
    const result = await Facility.findByIdAndUpdate(id, payload, { new: true });
    return result;
};
const deleteFacilityFromDB = async (id: string) => {
    const result = await Facility.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
};


export const FacilityServices = {
    createFacilityIntoDB,
    updateFacilityFromDB,
    deleteFacilityFromDB,
} 