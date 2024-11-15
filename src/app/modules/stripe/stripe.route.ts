// routes/stripe.routes.ts
import express from "express";
import { StripeController } from "./stripe.controller";

const router = express.Router();

// POST route for creating a checkout session
router.post("/create-checkout-session", StripeController.createCheckoutSession);

export const StripeRoutes = router;
