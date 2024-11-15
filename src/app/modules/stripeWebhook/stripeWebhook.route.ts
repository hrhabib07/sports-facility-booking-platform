// routes/stripeWebhook.routes.ts
import express from "express";
import { StripeWebhookController } from "./stripeWebhook.controller";

const router = express.Router();

// Use raw body for Stripe Webhooks
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  StripeWebhookController.handleStripeWebhook
);

export const StripeWebhookRoutes = router;
