import axios from "axios";
import config from "../../config";
import AppError from "../../errors/appError";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const initiatePayment = async (paymentData: any) => {
  try {
    // console.log("PaymentData", paymentData);
    const response = await axios.post(config.payment_url!, {
      store_id: config.store_id,
      signature_key: config.signature_key,
      tran_id: paymentData.transactionId,
      success_url: `http://localhost:5000/api/payment/confirmation?transactionId=${paymentData.transactionId}&status=success`,
      fail_url: `http://localhost:5000/api/payment/confirmation?&status=failed`,
      cancel_url: "http://localhost:5173/",
      amount: paymentData.totalPrice,
      currency: "BDT",
      desc: "Merchant Registration Payment",
      cus_name: paymentData.customerName,
      cus_email: paymentData.customerEmail,
      cus_add1: paymentData.customerAddress,
      cus_add2: "N/A",
      cus_city: "N/A",
      cus_state: "N/A",
      cus_postcode: "N/A",
      cus_country: "Bangladesh",
      cus_phone: paymentData.customerPhone,
      type: "json",
    });
    // console.log(response);
    return response.data;
  } catch (error) {
    throw new Error("there is some issue  in payment url ");
  }
};

export const verifyPayment = async (tnxId: string) => {
  const response = await axios.get(config.payment_verify_url!, {
    params: {
      store_id: config.store_id,
      signature_key: config.signature_key,
      type: "json",
      request_id: tnxId,
    },
  });
  return response.data;
};
