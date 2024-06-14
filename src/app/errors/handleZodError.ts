import { ZodError, ZodIssue } from "zod";
import { TErrorSource, TGenericResponse } from "../interface/error";

const handleZodError = (error: ZodError): TGenericResponse => {
    const statusCode = 400;
    const errorSources: TErrorSource = error.issues.map((issue: ZodIssue) => {
        return {
            path: issue?.path[issue.path.length - 1],
            message: issue.message,
        };
    });
    return {
        statusCode,
        message: "validation error",
        errorSources
    }

};

export default handleZodError;