import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (error: any): TGenericErrorResponse => {
  // Extract value within double quotes using regex
  const match = error.message.match(/"([^"]*)"/);

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];

  const statusCode = 400;
  const errorSources: TErrorSources = [
    {
      path: "",
      message: `${extractedMessage} is already exists`,
    },
  ];
  return {
    statusCode,
    message: "Invalid Id",
    errorSources,
  };
};

export default handleDuplicateError;
