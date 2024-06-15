import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";

const createFacilityIntoDB = async (payload: TFacility) => {
    const result = await Facility.create(payload);
    return result;
};
const updateFacilityFromDB = async (id: string, payload: Partial<TFacility>) => {
    const result = await Facility.findByIdAndUpdate(id, payload, { new: true });
    return result;
};


export const FacilityServices = {
    createFacilityIntoDB,
    updateFacilityFromDB
} 