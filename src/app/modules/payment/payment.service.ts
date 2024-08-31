import { paymentStatus } from "../booking/booking.constant";
import { Booking } from "../booking/booking.model";
import { verifyPayment } from "./payment.utils";

const confirmationService = async (transactionId: string, status: string) => {
  const verifyResponse = await verifyPayment(transactionId);
  let result;
  if (verifyResponse.pay_status === "Successful") {
    result = await Booking.findOneAndUpdate(
      { transactionId },
      { paymentStatus: paymentStatus.success, isBooked: "confirmed" }
    );
  }
  return `<h1> Payment ${status}</h1>`;
};
export const paymentService = {
  confirmationService,
};
