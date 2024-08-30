import { Request, Response } from "express";

const confirmationController = (req: Request, res: Response) => {
  res.send(`<h1> Payment success</h1>`);
};

export const PaymentController = {
  confirmationController,
};
