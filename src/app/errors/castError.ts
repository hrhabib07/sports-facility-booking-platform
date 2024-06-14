import { ZodError, ZodIssue } from "zod";
import mongoose from "mongoose";
import { TErrorSource, TGenericResponse } from "../interface/error";

const handleCastError = (error: mongoose.Error.CastError): TGenericResponse => {
    const statusCode = 400;
    const errorSources: TErrorSource = [{
        path: error?.path,
        message: error?.message
    }];
    return {
        statusCode,
        message: "Invalid Id",
        errorSources
    }

};

export default handleCastError;