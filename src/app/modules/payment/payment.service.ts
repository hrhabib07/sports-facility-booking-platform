import { readFileSync } from "fs";
import { paymentStatus } from "../booking/booking.constant";
import { Booking } from "../booking/booking.model";
import { verifyPayment } from "./payment.utils";
import { join } from "path";

const confirmationService = async (transactionId: string, status: string) => {
  const verifyResponse = await verifyPayment(transactionId);
  let result;
  let message = "";
  if (verifyResponse.pay_status === "Successful") {
    try {
      result = await Booking.findOneAndUpdate(
        { transactionId },
        { paymentStatus: paymentStatus.success, isBooked: "confirmed" },
        { new: true } // This returns the updated document
      );
    } catch (error) {
      console.error("Error updating booking:", error);
    }

    // console.log(
    //   "pay status status",
    //   verifyResponse.pay_status,
    //   "tranID",
    //   transactionId,
    //   "status: ",
    //   status
    // );
    // console.log(result);
    message = "Successfully paid";
  } else {
    message = "payment failed";
  }
  const filePath = join(__dirname, "../../../view/confirmation.html");
  let template = readFileSync(filePath, "utf-8");
  // console.log({ template });
  template = template.replace("{{message}}", message);
  return template;
};
export const paymentService = {
  confirmationService,
};
