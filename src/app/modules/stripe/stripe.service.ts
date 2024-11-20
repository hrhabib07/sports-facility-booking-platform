// services/stripe.service.ts
import Stripe from "stripe";
import httpStatus from "http-status";
import config from "../../config";
import { Types } from "mongoose";
import { User } from "../users/user.model";
import AppError from "../../errors/appError";

const stripe = new Stripe(config.stripe_secret_key as string, {
  apiVersion: "2024-10-28.acacia",
});

const createPaymentSession = async (price: number, userEmail: string) => {
  console.log("price,", price, "userEmail:", userEmail);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Membership Plan",
            },
            unit_amount: price * 100, // Convert price to cents
          },
          quantity: 1,
        },
      ],
      customer_email: userEmail,
      success_url: `${config.frontend_url}/success`,
      cancel_url: `${config.frontend_url}/cancel`,
    });

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    // Subscription logic
    let validUntil;
    const currentDate = new Date();
    validUntil = price > 1 ? addDays(currentDate, 30) : addDays(currentDate, 1);

    if (user._id) {
      await User.findByIdAndUpdate(user._id, {
        subscription: {
          _id: new Types.ObjectId(),
          createdAt: currentDate,
          validUntil,
        },
      });
    }

    return session;
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    return null; // Or you can throw a custom error
  }
};

export const StripeService = {
  createPaymentSession,
};

function addDays(currentDate: Date, arg1: number): any {
  throw new Error("Function not implemented.");
}
