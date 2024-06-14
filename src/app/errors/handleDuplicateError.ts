import { TErrorSource, TGenericResponse } from "../interface/error";


const handleDuplicateError = (error: any): TGenericResponse => {

    // Extract value within double quotes using regex
    const match = error.message.match(/"([^"]*)"/);

    // The extracted value will be in the first capturing group
    const extractedMessage = match && match[1];

    const statusCode = 400;
    const errorSources: TErrorSource = [{
        path: '',
        message: `${extractedMessage} is already exists`,
    }];
    return {
        statusCode,
        message: "Invalid Id",
        errorSources
    }

};

export default handleDuplicateError;