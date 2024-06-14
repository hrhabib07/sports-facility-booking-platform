import { Response } from "express";

type TResponseData<T> = {
    statusCode: number,
    success: boolean,
    message?: string,
    data: T
};
const sendResponse = <T>(res: Response, data: TResponseData<T>) => {
    res.status(data.statusCode).json({
        success: data.success,
        statuscode: data.statusCode,
        message: data.message,
        data: data.data
    })
};
export default sendResponse;
