import { Response } from "express";
import httpStatus from "http-status";

type TResponseData<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponseData<T>) => {
  if (Array.isArray(data.data) && data.data.length === 0) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No Data Found",
      data: [],
    });
  } else if (!Array.isArray(data.data) && data.data == null) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No Data Found",
      data: [],
    });
  }

  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode, // Corrected typo
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;
