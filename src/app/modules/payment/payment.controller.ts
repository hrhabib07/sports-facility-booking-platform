import { Request, Response } from "express";
import { paymentService } from "./payment.service";

const confirmationController = async (req: Request, res: Response) => {
  //   console.log(req.query.transactionId);
  const { transactionId, status } = req.query;
  const result = await paymentService.confirmationService(
    transactionId as string,
    status as string
  );
  res.send(result);
};

export const PaymentController = {
  confirmationController,
};
