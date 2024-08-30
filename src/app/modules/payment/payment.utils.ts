import axios from "axios";
import config from "../../config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const initiatePayment = async (paymentData: any) => {
  // console.log("PaymentData", paymentData);
  const response = await axios.post(config.payment_url!, {
    store_id: config.store_id,
    signature_key: config.signature_key,
    tran_id: paymentData.transactionId,
    success_url: "http://www.merchantdomain.com/suc esspage.html",
    fail_url: "http://www.merchantdomain.com/faile dpage.html",
    cancel_url: "http://www.merchantdomain.com/can cellpage.html",
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
};
