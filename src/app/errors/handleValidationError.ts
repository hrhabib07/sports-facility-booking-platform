
import mongoose from "mongoose";
import { TErrorSource, TGenericResponse } from "../interface/error";

const handleValidationError = (error: mongoose.Error.ValidationError): TGenericResponse => {
    const statusCode = 400;
    const errorSources: TErrorSource = Object.values(error.errors).map((val: any) => {
        return {
            path: val?.path,
            message: val?.message,
        };
    });
    return {
        statusCode,
        message: "validation error",
        errorSources
    }

};

export default handleValidationError;