import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleValidationError = (
  error: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const statusCode = 400;
  const errorSources: TErrorSources = Object.values(error.errors).map(
    (val: any) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );
  return {
    statusCode,
    message: "validation error",
    errorSources,
  };
};

export default handleValidationError;
